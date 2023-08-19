import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  private extractJwjtFromCookie(request: Request): string | undefined {
    let token = request.cookies["jwt"];
    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractJwjtFromCookie(req);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get("SECRET"),
      });
      payload["id"] = payload["sub"];
      req["user"] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
