"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTodoDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateTodoDto {
}
exports.CreateTodoDto = CreateTodoDto;
__decorate([
    (0, class_validator_1.MaxLength)(255, {
        message: "Todo title can't be longer than 255 chars",
    }),
    (0, swagger_1.ApiProperty)({ description: "Title of the todo, max 255 chars" }),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, swagger_1.ApiProperty)({ description: "Content of the todo." }),
    __metadata("design:type", String)
], CreateTodoDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsBoolean)(),
    (0, swagger_1.ApiProperty)({ description: "Todo is done or not" }),
    __metadata("design:type", Boolean)
], CreateTodoDto.prototype, "done", void 0);
//# sourceMappingURL=create-todo.dto.js.map