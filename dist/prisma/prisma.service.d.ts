import { PrismaClient } from "@prisma/client";
type TsingleUserSetting = Record<string, any>;
export declare class PrismaService extends PrismaClient {
    _verifySetting(key: string, value: any): boolean;
    _verifySettingArray(array: TsingleUserSetting[]): boolean;
    findAllSettings(userId: number): Promise<TsingleUserSetting>;
    findFirstSetting(userId: number, key: string): Promise<TsingleUserSetting | null>;
    updateOneSetting(userId: number, key: string, value: any): Promise<TsingleUserSetting | null>;
    updateManySettings(userId: number, settingsArray: TsingleUserSetting[]): Promise<TsingleUserSetting[]>;
}
export {};
