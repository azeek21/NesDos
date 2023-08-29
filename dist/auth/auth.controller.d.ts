import SignInDto from "./dto/signInDto";
import { AuthService } from "./auth.service";
import { SignUpTdo } from "./dto/signUpDto";
import { Response } from "express";
import { AuthedRequest } from "./types";
export declare class AuthController {
    private auth;
    constructor(auth: AuthService);
    signIn(body: SignInDto, res: Response): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        settings: string;
    }>;
    srignUp(body: SignUpTdo, res: Response): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        settings: string;
    }>;
    signOut(res: Response): Promise<{
        success: boolean;
    }>;
    getUserProfile(req: AuthedRequest): {
        id: number;
        name: string;
        email: string;
    };
}
