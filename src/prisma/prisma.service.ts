import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

const DEFALUT_USER_SETTINGS = [
  {
    name: "listViewStyle",
    value: "list",
    allowed: ["list", "card"],
  },
];

type TuserSettings = typeof DEFALUT_USER_SETTINGS;
type TsingleUserSetting = Record<string, any>;

@Injectable()
export class PrismaService extends PrismaClient {
  _verifySetting(key: string, value: any) {
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

  _verifySettingArray(array: TsingleUserSetting[]) {
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

  async findAllSettings(userId: number): Promise<TsingleUserSetting> {
    const user = await this.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        settings: true,
      },
    });
    const settings: TuserSettings = JSON.parse(user.settings);
    const res = {};
    for (let set of settings) {
      res[set.name] = set.value;
    }
    return res;
  }

  async findFirstSetting(
    userId: number,
    key: string,
  ): Promise<TsingleUserSetting | null> {
    const user = await this.user.findFirst({
      where: { id: userId },
      select: { settings: true },
    });
    const settings: TuserSettings = JSON.parse(user.settings);
    const res = settings.find((set) => set.name == key);
    if (res) {
      return {
        [res.name]: res.value,
      };
    }
    return null;
  }

  async updateOneSetting(
    userId: number,
    key: string,
    value: any,
  ): Promise<TsingleUserSetting | null> {
    if (!this._verifySetting(key, value)) {
      return null;
    }

    const user = await this.user.findFirst({
      where: { id: userId },
      select: { settings: true },
    });

    const allUserSettings: TuserSettings = JSON.parse(user.settings);
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

  async updateManySettings(
    userId: number,
    settingsArray: TsingleUserSetting[],
  ) {
    if (!this._verifySettingArray(settingsArray)) {
      return null;
    }

    const user = await this.user.findFirst({
      where: { id: userId },
      select: { settings: true },
    });
    const userSettings: TuserSettings = JSON.parse(user.settings);

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
}
