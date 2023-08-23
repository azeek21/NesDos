import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TodosModule } from "./todos/todos.module";
import { TodosService } from "./todos/todos.service";
import { TodosController } from "./todos/todos.controller";
import { PrismaModule } from "./prisma/prisma.module";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { ConfigModule } from "@nestjs/config";
import { SettingsController } from "./settings/settings.controller";
import { SettingsModule } from "./settings/settings.module";
import { SettingsService } from "./settings/settings.service";

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    TodosModule,
    ConfigModule.forRoot({ isGlobal: true }),
    SettingsModule,
  ],
  controllers: [AppController, TodosController, SettingsController],
  providers: [AppService, TodosService, SettingsService],
})
export class AppModule {}
