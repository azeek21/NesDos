"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const CookieParser = require("cookie-parser");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    app.use(CookieParser());
    app.enableCors({
        origin: true,
        credentials: true,
    });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle("Todo app")
        .setDescription("Todos API endpoind documentation")
        .setVersion("1.0")
        .addTag("todos")
        .addCookieAuth("jwt", {
        description: "jwt session toke for authentication",
        type: "http",
    });
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup("api", app, document, {
        swaggerOptions: {
            defaultModelsExpandDepth: -1,
        },
    });
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map