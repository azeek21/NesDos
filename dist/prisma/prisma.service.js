"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const DEFALUT_USER_SETTINGS = [
    {
        name: "listViewStyle",
        value: "list",
        allowed: ["list", "card"],
    },
];
let PrismaService = exports.PrismaService = class PrismaService extends client_1.PrismaClient {
    _verifySetting(key, value) {
        const setting = DEFALUT_USER_SETTINGS.find((s) => s.name === key);
        if (!setting) {
            return false;
        }
        if (typeof setting.value !== typeof value) {
            return false;
        }
        if (!setting.allowed.includes(value)) {
            return false;
        }
        return true;
    }
    _verifySettingArray(array) {
        if (array.length > DEFALUT_USER_SETTINGS.length) {
            return false;
        }
        for (let setting of array) {
            if (!setting.key || setting.value === undefined) {
                return false;
            }
            if (!this._verifySetting(setting.key, setting.value)) {
                return false;
            }
        }
        return true;
    }
    async findAllSettings(userId) {
        const user = await this.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                settings: true,
            },
        });
        const settings = JSON.parse(user.settings);
        const res = {};
        for (let set of settings) {
            res[set.name] = set.value;
        }
        return res;
    }
    async findFirstSetting(userId, key) {
        const user = await this.user.findFirst({
            where: { id: userId },
            select: { settings: true },
        });
        const settings = JSON.parse(user.settings);
        const res = settings.find((set) => set.name == key);
        if (res) {
            return {
                [res.name]: res.value,
            };
        }
        return null;
    }
    async updateOneSetting(userId, key, value) {
        if (!this._verifySetting(key, value)) {
            return null;
        }
        const user = await this.user.findFirst({
            where: { id: userId },
            select: { settings: true },
        });
        const allUserSettings = JSON.parse(user.settings);
        const toBeUpdated = allUserSettings.find((s) => s.name === key);
        toBeUpdated.value = value;
        const settingsString = JSON.stringify(allUserSettings);
        await this.user.update({
            where: { id: userId },
            data: {
                settings: settingsString,
            },
        });
        return {
            [key]: value,
        };
    }
    async updateManySettings(userId, settingsArray) {
        if (!this._verifySettingArray(settingsArray)) {
            return null;
        }
        const user = await this.user.findFirst({
            where: { id: userId },
            select: { settings: true },
        });
        const userSettings = JSON.parse(user.settings);
        for (let set of settingsArray) {
            const cur = userSettings.find((s) => s.name == set.key);
            cur.value = set.value;
        }
        await this.user.update({
            where: { id: userId },
            data: {
                settings: JSON.stringify(userSettings),
            },
        });
        return settingsArray;
    }
};
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map