import { Prisma } from "@prisma/client";
export declare class SignUpTdo implements Prisma.UserCreateInput {
    name: string;
    email: string;
    password: string;
}
