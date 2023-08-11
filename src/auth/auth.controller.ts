import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards,
  Request,
} from "@nestjs/common";
import SignInDto from "./dto/signInDto";
import { AuthService } from "./auth.service";
import { SignUpTdo } from "./dto/signUpDto";
import { AuthGuard } from "./auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("login")
  signIn(@Body() body: SignInDto) {
    return this.auth.signIn(body.email, body.password);
  }

  @Post("register")
  srignUp(@Body() body: SignUpTdo) {
    return this.auth.signUp(body);
  }

  @Post("logout")
  signOut() {
    return this.auth.signOut();
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getUserProfile(@Request() req) {
    return req["user"];
  }
}
