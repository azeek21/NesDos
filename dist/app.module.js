"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const todos_module_1 = require("./todos/todos.module");
const todos_service_1 = require("./todos/todos.service");
const todos_controller_1 = require("./todos/todos.controller");
const prisma_module_1 = require("./prisma/prisma.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const settings_controller_1 = require("./settings/settings.controller");
const settings_module_1 = require("./settings/settings.module");
const settings_service_1 = require("./settings/settings.service");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            todos_module_1.TodosModule,
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            settings_module_1.SettingsModule,
        ],
        controllers: [app_controller_1.AppController, todos_controller_1.TodosController, settings_controller_1.SettingsController],
        providers: [app_service_1.AppService, todos_service_1.TodosService, settings_service_1.SettingsService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map