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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const config_1 = require("@nestjs/config");
let AuthService = exports.AuthService = class AuthService {
    constructor(userService, jwtService, configService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async makeUserJwtAsync(user, res) {
        delete user.password;
        const token = await this.jwtService.signAsync({
            sub: user.id,
            name: user.name,
            email: user.email,
        });
        res.cookie("jwt", token, {
            maxAge: this.configService.get("JWT_MAX_AGE_IN_MS"),
            path: "/",
            httpOnly: true,
        });
        return {
            ...user,
        };
    }
    async signIn(email, password, res) {
        const user = await this.userService.findOne({ email: email });
        if (!user || user.password !== password) {
            throw new common_1.UnauthorizedException();
        }
        return this.makeUserJwtAsync(user, res);
    }
    async signUp(data, res) {
        let user = await this.userService.findOne({ email: data.email });
        if (user) {
            throw new common_1.ConflictException("Email already registered");
        }
        user = await this.userService.create(data);
        return this.makeUserJwtAsync(user, res);
    }
    async signOut(res) {
        res.cookie("jwt", "", {
            maxAge: -1,
        });
        return {
            success: true,
        };
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map