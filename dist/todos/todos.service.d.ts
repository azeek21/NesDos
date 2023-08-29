import { Prisma } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
interface IfindAllParams {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
}
export declare class TodosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.TodoUncheckedCreateInput): Promise<{
        id: number;
        title: string;
        content: string;
        done: boolean;
        ownerId: number;
    }>;
    findAll(params?: IfindAllParams): Promise<{
        id: number;
        title: string;
        content: string;
        done: boolean;
        ownerId: number;
    }[]>;
    findOne(todoWhereUniqueInput: Prisma.TodoWhereUniqueInput): Promise<{
        id: number;
        title: string;
        content: string;
        done: boolean;
        ownerId: number;
    }>;
    update(params: {
        where: Prisma.TodoWhereUniqueInput;
        data: Prisma.TodoUpdateInput;
    }): Promise<{
        id: number;
        title: string;
        content: string;
        done: boolean;
        ownerId: number;
    }>;
    delete(where: Prisma.TodoWhereUniqueInput): Promise<Prisma.BatchPayload>;
}
export {};
