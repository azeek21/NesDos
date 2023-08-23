import { Settings } from "@prisma/client";
import { IsDefined, IsOptional, isDefined } from "class-validator";
import { settingsTypes } from "src/prisma/prisma.service";
export class CreateSettingDto implements Settings {
  id: number;

  @IsDefined()
  value: string;

  @IsDefined()
  key: string;

  @IsDefined()
  type: settingsTypes;

  @IsOptional()
  create: boolean;

  @IsDefined()
  allowed: string[];

  userId: number;
}
