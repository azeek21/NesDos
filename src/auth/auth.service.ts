import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async returnJwtAsnyc(payload: any) {
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findOne({ email: email });
    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    delete user.password;
    const payload = { sub: user.id, email: user.email, name: user.name };

    return this.returnJwtAsnyc(payload);
  }

  async signUp(data: Prisma.UserCreateInput) {
    let user = await this.userService.findOne({ email: data.email });
    if (user) {
      throw new ConflictException("Email already registered");
    }

    // TODO: IMPLEMENT BCRYPT PASSWORD
    user = await this.userService.create(data);
    delete user.password;
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    return this.returnJwtAsnyc(payload);
  }

  async signOut() {
    return {
      access_token: "",
    };
  }
}
