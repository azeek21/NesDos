import { Injectable } from "@nestjs/common";
import UpdateSettingsDto from "./dto/update-setting.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    return this.prisma.findAllSettings(userId);
  }

  async findOne(userId: number, key: string) {
    return this.prisma.findFirstSetting(userId, key);
  }

  async update(userId: number, key: string, body: UpdateSettingsDto) {
    return this.prisma.updateOneSetting(userId, key, body.value);
  }

  async updateMany(userId: number, body: UpdateSettingsDto[]) {
    return this.prisma.updateManySettings(userId, body);
  }
}
