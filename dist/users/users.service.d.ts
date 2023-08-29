import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.UserCreateInput): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        settings: string;
    }>;
    update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        settings: string;
    }>;
    findOne(where: Prisma.UserWhereUniqueInput): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        settings: string;
    }>;
    findAll(): Promise<{
        id: number;
        email: string;
        name: string;
        password: string;
        settings: string;
    }[]>;
}
