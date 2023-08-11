import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "src/users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      signOptions: { expiresIn: "30d" },
      secret: new ConfigService().get("SECRET"),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
