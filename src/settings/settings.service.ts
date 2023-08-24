import { Injectable } from "@nestjs/common";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async create(createSettingDto: CreateSettingDto, usereId: number) {
    const res = await this.prisma.setSetting({
      key: createSettingDto.key,
      create: true,
      value: createSettingDto.value,
      allowed: createSettingDto.allowed,
      type: createSettingDto.type,
      userId: usereId,
    });
    console.log("created: ", res);
    return res;
  }

  findAll(userId: number) {
    return this.prisma.settings.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(key: string, userId: number) {
    const setting = await this.prisma.getSetting({
      key,
      userId,
    });
    return {
      [key]: setting,
    };
  }

  async update(
    key: string,
    updateSettingDto: UpdateSettingDto,
    userId: number,
  ) {
    updateSettingDto.key = key;
    const res = await this.prisma.settings.update({
      where: {
        key: updateSettingDto.key,
        userId: userId,
      },
      data: {
        key: updateSettingDto.key,
        value: updateSettingDto.value,
      },
    });
    return res;
  }

  remove(id: number) {
    return `This action removes a #${id} setting`;
  }
}
