import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/users.service";
import { ConfigService } from "@nestjs/config";
import { Prisma } from "@prisma/client";
import { Response } from "express";
export declare class AuthService {
    private userService;
    private jwtService;
    private configService;
    constructor(userService: UsersService, jwtService: JwtService, configService: ConfigService);
    private makeUserJwtAsync;
    signIn(email: string, password: string, res: Response): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        settings: string;
    }>;
    signUp(data: Prisma.UserCreateInput, res: Response): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        settings: string;
    }>;
    signOut(res: Response): Promise<{
        success: boolean;
    }>;
}
