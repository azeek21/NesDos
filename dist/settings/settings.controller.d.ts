import { SettingsService } from "./settings.service";
import UpdateSettingsDto from "./dto/update-setting.dto";
import { AuthedRequest } from "src/auth/types";
export declare class SettingsController {
    private readonly settingsService;
    constructor(settingsService: SettingsService);
    findAll(req: AuthedRequest): Promise<{
        [x: string]: any;
    }>;
    findOne(key: string, req: AuthedRequest): Promise<{
        [x: string]: any;
    }>;
    update(key: string, body: UpdateSettingsDto, req: AuthedRequest): Promise<{
        [x: string]: any;
    }>;
    bulkUpdate(body: UpdateSettingsDto[], req: AuthedRequest): Promise<{
        [x: string]: any;
    }[]>;
}
