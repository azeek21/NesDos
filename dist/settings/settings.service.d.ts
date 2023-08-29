import UpdateSettingsDto from "./dto/update-setting.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class SettingsService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(userId: number): Promise<{
        [x: string]: any;
    }>;
    findOne(userId: number, key: string): Promise<{
        [x: string]: any;
    }>;
    update(userId: number, key: string, body: UpdateSettingsDto): Promise<{
        [x: string]: any;
    }>;
    updateMany(userId: number, body: UpdateSettingsDto[]): Promise<{
        [x: string]: any;
    }[]>;
}
