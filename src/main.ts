import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

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
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Todo app")
    .setDescription("Todos API endpoind documentation")
    .setVersion("1.0")
    .addTag("todos")
    .addCookieAuth("jwt", {
      description: "jwt session toke for authentication",
      type: "http",
    });
  const document = SwaggerModule.createDocument(app, swaggerConfig as any);
  SwaggerModule.setup("api", app, document, {
    swaggerOptions: {
      defaultModelsExpandDepth: -1,
    },
  });
  await app.listen(3001);
}
bootstrap();
