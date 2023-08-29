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
exports.SignUpTdo = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class SignUpTdo {
}
exports.SignUpTdo = SignUpTdo;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ description: "Name of the user to sign up" }),
    __metadata("design:type", String)
], SignUpTdo.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    (0, swagger_1.ApiProperty)({
        description: "Email of the user, it has to be unuque per user.",
    }),
    __metadata("design:type", String)
], SignUpTdo.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsStrongPassword)({
        minLength: 8,
        minUppercase: 1,
        minLowercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, {
        message: "Password should be minimum 8 characters long and shuld constist of at least 1 uppercase letter, 1 lower case letter, 1 number and 1 symbol",
    }),
    (0, swagger_1.ApiProperty)({
        description: "Password should be minimum 8 characters long and shuld constist of at least 1 uppercase letter, 1 lower case letter, 1 number and 1 symbol",
    }),
    __metadata("design:type", String)
], SignUpTdo.prototype, "password", void 0);
//# sourceMappingURL=signUpDto.js.map