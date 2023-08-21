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
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiCookieAuth,
} from "@nestjs/swagger/dist";
import { logoutEntity, userEntity } from "./entities/user.entity";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post("login")
  @ApiOkResponse({ type: userEntity })
  signIn(@Body() body: SignInDto, @Res({ passthrough: true }) res: Response) {
    console.log("login: ", body);
    return this.auth.signIn(body.email, body.password, res);
  }

  @Post("signup")
  @ApiCreatedResponse({ type: userEntity })
  srignUp(@Body() body: SignUpTdo, @Res({ passthrough: true }) res: Response) {
    return this.auth.signUp(body, res);
  }

  @UseGuards(AuthGuard)
  @Post("logout")
  @ApiOkResponse({ type: logoutEntity })
  signOut(@Res({ passthrough: true }) res: Response) {
    return this.auth.signOut(res);
  }

  @UseGuards(AuthGuard)
  @ApiCookieAuth("jwt")
  @Get("profile")
  @ApiOkResponse({ type: userEntity })
  getUserProfile(@Request() req: AuthedRequest) {
    return req.user;
  }
}
