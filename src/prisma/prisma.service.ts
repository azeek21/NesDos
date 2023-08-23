import { Injectable } from "@nestjs/common";
import { PrismaClient, Settings } from "@prisma/client";

export type settingsTypes = "string" | "object" | "boolean" | "number";

type Isettings = {
  key: string;
  value: any;
  userId: number;
} & (
  | {
      create: true;
      allowed: string[];
      type: settingsTypes;
    }
  | {
      create?: false;
      type?: settingsTypes;
      allowed?: string[];
    }
);

function fromAnyToString(value: any, fromType: settingsTypes) {
  if (fromType == "boolean") {
    return "false";
  }
  if (fromType == "number") {
    return String(value);
  }
  if (fromType == "object") {
    return JSON.stringify(value);
  }
  return String(value);
}

function fromStringToType(value: string, toType: settingsTypes) {
  if (toType == "object") {
    return JSON.parse(value);
  }
  if (toType == "number") {
    return Number(value);
  }
  if (toType == "boolean") {
    if (
      value == "false" ||
      value == "undefined" ||
      value == "none" ||
      value == "unknown"
    ) {
      return false;
    }
    return true;
  }
  return value;
}

@Injectable()
export class PrismaService extends PrismaClient {
  async setSetting(options: Isettings) {
    options.value = fromAnyToString(options.value, options.type);

    if (options.create) {
      return this.settings.create({
        data: {
          key: options.key,
          value: options.value,
          allowed: options.allowed,
          userId: options.userId,
          type: options.type,
        },
      });
    }

    return this.settings.update({
      where: {
        key: options.key,
        userId: options.userId,
      },
      data: {
        value: options.value,
        type: options.type,
        allowed: options.allowed,
      },
    });
  }

  async getSetting({ key, userId }: { key: string; userId: number }) {
    const setting = await this.settings.findFirst({
      where: {
        key: key,
        userId: userId,
      },
    });
    return fromStringToType(setting.value, setting.type as settingsTypes);
  }
}

const listOfCurrentSettings = [
  {
    key: "todoListViewType",
    type: "string",
    allowed: ["card", "list"],
    default: "list",
  },
];
