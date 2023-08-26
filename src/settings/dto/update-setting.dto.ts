import { IsDefined, IsOptional, IsString, isDefined } from "class-validator";

export default class UpdateSettingsDto {
  @IsString()
  key: string;

  @IsDefined()
  value: any;
}
