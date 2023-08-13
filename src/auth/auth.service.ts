import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { Prisma, User } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async makeUserJwtAsync(user: User) {
    delete user.password;

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        name: user.name,
        email: user.email,
      }),
    };
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.findOne({ email: email });
    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    return this.makeUserJwtAsync(user);
  }

  async signUp(data: Prisma.UserCreateInput) {
    let user = await this.userService.findOne({ email: data.email });
    if (user) {
      throw new ConflictException("Email already registered");
    }

    // TODO: IMPLEMENT BCRYPT PASSWORD
    user = await this.userService.create(data);

    return this.makeUserJwtAsync(user);
  }

  async signOut() {
    return {
      access_token: "",
    };
  }
}
