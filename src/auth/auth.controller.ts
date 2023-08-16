import {
  Controller,
  Body,
  Post,
  Get,
  UseGuards,
  Request,
  Res,
} from "@nestjs/common";
import SignInDto from "./dto/signInDto";
import { AuthService } from "./auth.service";
import { SignUpTdo } from "./dto/signUpDto";
import { AuthGuard } from "./auth.guard";
import { Response } from "express";
import { AuthedRequest } from "./types";

@Controller("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("login")
  signIn(@Body() body: SignInDto, @Res({ passthrough: true }) res: Response) {
    console.log("login: ", body);
    return this.auth.signIn(body.email, body.password, res);
  }

  @Post("register")
  srignUp(@Body() body: SignUpTdo, @Res({ passthrough: true }) res: Response) {
    return this.auth.signUp(body, res);
  }

  @Post("logout")
  signOut(@Res({ passthrough: true }) res: Response) {
    return this.auth.signOut(res);
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getUserProfile(@Request() req: AuthedRequest) {
    return req.user;
  }
}
