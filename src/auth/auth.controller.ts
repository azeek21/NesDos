import { Controller, Body, Post } from "@nestjs/common";
import SignInDto from "./dto/signInDto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("login")
  signIn(@Body() body: SignInDto) {
    return this.auth.signIn(body.email, body.password);
  }
}
