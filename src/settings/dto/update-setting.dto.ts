import { PartialType } from "@nestjs/swagger";
import { CreateSettingDto } from "./create-setting.dto";
import { IsOptional } from "class-validator";

export class UpdateSettingDto extends CreateSettingDto {
  @IsOptional()
  allowed: string[];
}
