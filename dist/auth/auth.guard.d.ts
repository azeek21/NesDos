import { CanActivate, ExecutionContext } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class AuthGuard implements CanActivate {
    private jwtService;
    private configService;
    constructor(jwtService: JwtService, configService: ConfigService);
    private extractJwjtFromCookie;
    canActivate(context: ExecutionContext): Promise<boolean>;
}
