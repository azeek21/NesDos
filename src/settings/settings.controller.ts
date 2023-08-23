import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from "@nestjs/common";
import { SettingsService } from "./settings.service";
import { CreateSettingDto } from "./dto/create-setting.dto";
import { UpdateSettingDto } from "./dto/update-setting.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger";
import { AuthedRequest } from "src/auth/types";

@ApiTags("settings")
@ApiCookieAuth("jwt")
@UseGuards(AuthGuard)
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Post()
  create(
    @Body() createSettingDto: CreateSettingDto,
    @Request() req: AuthedRequest,
  ) {
    const user = req.user;
    return this.settingsService.create(createSettingDto, user.id);
  }

  @Get()
  findAll(@Request() req: AuthedRequest) {
    const user = req.user;

    return this.settingsService.findAll(user.id);
  }

  @Get(":key")
  findOne(@Param("key") key: string, @Request() req: AuthedRequest) {
    const user = req.user;
    return this.settingsService.findOne(key, user.id);
  }

  @Patch(":key")
  update(
    @Param("key") key: string,
    @Body() updateSettingDto: UpdateSettingDto,
    @Request() req: AuthedRequest,
  ) {
    const user = req.user;
    return this.settingsService.update(key, updateSettingDto, user.id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.settingsService.remove(+id);
  }
}
