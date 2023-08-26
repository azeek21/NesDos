import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Request,
  ConflictException,
} from "@nestjs/common";
import { SettingsService } from "./settings.service";
import UpdateSettingsDto from "./dto/update-setting.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiCookieAuth, ApiTags } from "@nestjs/swagger";
import { AuthedRequest } from "src/auth/types";

@ApiTags("settings")
@ApiCookieAuth("jwt")
@UseGuards(AuthGuard)
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  findAll(@Request() req: AuthedRequest) {
    const user = req.user;
    return this.settingsService.findAll(user.id);
  }

  @Get(":key")
  findOne(@Param("key") key: string, @Request() req: AuthedRequest) {
    const user = req.user;
    return this.settingsService.findOne(user.id, key);
  }

  @Patch(":key")
  update(
    @Param("key") key: string,
    @Body() body: UpdateSettingsDto,
    @Request() req: AuthedRequest,
  ) {
    const user = req.user;
    return this.settingsService.update(user.id, key, body);
  }

  @Patch()
  async bulkUpdate(
    @Body() body: UpdateSettingsDto[],
    @Request() req: AuthedRequest,
  ) {
    const user = req.user;
    const res = await this.settingsService.updateMany(user.id, body);
    if (!res) {
      throw new ConflictException("Found not matching keys");
    }
    return res;
  }
}
