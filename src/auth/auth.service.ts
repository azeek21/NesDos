import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { Prisma, User } from "@prisma/client";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private async makeUserJwtAsync(user: User, res: Response) {
    delete user.password;
    const token = await this.jwtService.signAsync({
      sub: user.id,
      name: user.name,
      email: user.email,
    });
    res.cookie("jwt", token, {
      maxAge: this.configService.get("JWT_MAX_AGE_IN_MS"),
      path: "/",
      httpOnly: true,
    });
    return {
      ...user,
    };
  }

  async signIn(email: string, password: string, res: Response) {
    const user = await this.userService.findOne({ email: email });

    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }
    return this.makeUserJwtAsync(user, res);
  }

  async signUp(data: Prisma.UserCreateInput, res: Response) {
    let user = await this.userService.findOne({ email: data.email });
    if (user) {
      throw new ConflictException("Email already registered");
    }

    // TODO: IMPLEMENT BCRYPT PASSWORD
    user = await this.userService.create(data);

    return this.makeUserJwtAsync(user, res);
  }

  async signOut(res: Response) {
    res.cookie("jwt", "", {
      maxAge: -1,
    });
    return {
      success: true,
    };
  }
}
