"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var JwtAuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
let JwtAuthGuard = JwtAuthGuard_1 = class JwtAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
    logger = new common_1.Logger(JwtAuthGuard_1.name);
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;
        this.logger.log(`JWT Auth attempt - Has Authorization header: ${!!authHeader}`);
        if (authHeader) {
            this.logger.log(`Authorization header value: ${authHeader.substring(0, 20)}...`);
        }
        return super.canActivate(context);
    }
    handleRequest(err, user, info) {
        if (err || !user) {
            this.logger.error(`JWT Auth failed - Error: ${err?.message || 'none'}, User: ${!!user}, Info: ${info?.message || 'none'}`);
            if (info?.message === 'No auth token') {
                throw new common_1.UnauthorizedException('No authentication token provided. Please include Bearer token in Authorization header.');
            }
            if (info?.message === 'jwt malformed') {
                throw new common_1.UnauthorizedException('Invalid token format. Token must be a valid JWT.');
            }
            if (info?.message === 'jwt expired') {
                throw new common_1.UnauthorizedException('Token has expired. Please log in again.');
            }
            throw err || new common_1.UnauthorizedException('Access Denied. Please log in.');
        }
        this.logger.log(`JWT Auth successful for user: ${user.email}`);
        return user;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = JwtAuthGuard_1 = __decorate([
    (0, common_1.Injectable)()
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map