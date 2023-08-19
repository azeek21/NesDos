import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(cookieParser());
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://0.0.0.0",
      "0.0.0.0",
      "http://locahlost",
    ],
    credentials: true,
  });
  await app.listen(3001);
}
bootstrap();
