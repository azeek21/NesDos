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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const signInDto_1 = require("./dto/signInDto");
const auth_service_1 = require("./auth.service");
const signUpDto_1 = require("./dto/signUpDto");
const auth_guard_1 = require("./auth.guard");
const dist_1 = require("@nestjs/swagger/dist");
const user_entity_1 = require("./entities/user.entity");
let AuthController = exports.AuthController = class AuthController {
    constructor(auth) {
        this.auth = auth;
    }
    signIn(body, res) {
        return this.auth.signIn(body.email, body.password, res);
    }
    srignUp(body, res) {
        return this.auth.signUp(body, res);
    }
    signOut(res) {
        return this.auth.signOut(res);
    }
    getUserProfile(req) {
        return req.user;
    }
};
__decorate([
    (0, common_1.Post)("login"),
    (0, dist_1.ApiOkResponse)({ type: user_entity_1.userEntity }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signInDto_1.default, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, common_1.Post)("signup"),
    (0, dist_1.ApiCreatedResponse)({ type: user_entity_1.userEntity }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signUpDto_1.SignUpTdo, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "srignUp", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, dist_1.ApiCookieAuth)("jwt"),
    (0, common_1.Post)("logout"),
    (0, dist_1.ApiOkResponse)({ type: user_entity_1.logoutEntity }),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signOut", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, dist_1.ApiCookieAuth)("jwt"),
    (0, common_1.Get)("profile"),
    (0, dist_1.ApiOkResponse)({ type: user_entity_1.userEntity }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getUserProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)("auth"),
    (0, dist_1.ApiTags)("auth"),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map