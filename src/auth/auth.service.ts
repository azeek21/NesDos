import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findOne({ email: email });
    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    delete user.password;

    // TODO: JWT GENERATE HERE. TMP solution
    return JSON.stringify(user);
  }
}
