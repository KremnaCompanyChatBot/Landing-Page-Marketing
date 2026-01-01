"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const crypto = __importStar(require("crypto"));
const google_auth_library_1 = require("google-auth-library");
const googleClient = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_CLIENT_ID);
let AuthService = class AuthService {
    userService;
    jwtService;
    constructor(userService, jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }
    async login(email, password) {
        console.log('[AuthService] Login attempt for email:', email);
        const user = await this.userService.findByEmail(email);
        if (!user) {
            console.log('[AuthService] User not found for email:', email);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        console.log('[AuthService] User found:', {
            id: user.id,
            email: user.email,
            hasPassword: !!user.password,
            isGoogleUser: user.isGoogleUser,
        });
        if (user.isGoogleUser && !user.password) {
            console.log('[AuthService] User is Google-only user without password');
            throw new common_1.BadRequestException('This account was created with Google. Please use Google Sign-In.');
        }
        console.log('[AuthService] Validating password...');
        const isPasswordValid = await user.validatePassword(password);
        console.log('[AuthService] Password valid:', isPasswordValid);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);
        console.log('[AuthService] Login successful, token generated');
        return {
            success: true,
            token,
        };
    }
    async validateGoogleTokenAndLogin(googleToken) {
        try {
            const ticket = await googleClient.verifyIdToken({
                idToken: googleToken,
                audience: process.env.GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();
            if (!payload || !payload.email) {
                throw new common_1.BadRequestException('Invalid Google token');
            }
            const googleUser = {
                googleId: payload.sub,
                email: payload.email,
                firstName: payload.given_name || 'User',
                lastName: payload.family_name || '',
            };
            const user = await this.findOrCreateGoogleUser(googleUser);
            const jwtPayload = { sub: user.id, email: user.email };
            const token = this.jwtService.sign(jwtPayload);
            return {
                success: true,
                token,
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Google authentication failed');
        }
    }
    async findOrCreateGoogleUser(googleUser) {
        let user = await this.userService.findByEmail(googleUser.email);
        if (!user) {
            user = await this.userService.create({
                email: googleUser.email,
                firstName: googleUser.firstName,
                lastName: googleUser.lastName,
                googleId: googleUser.googleId,
                isGoogleUser: true,
            });
        }
        else if (!user.isGoogleUser) {
            user.googleId = googleUser.googleId;
            user.isGoogleUser = true;
            await this.userService.create(user);
        }
        return user;
    }
    async forgotPassword(forgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const message = await this.userService.forgotPassword(email);
        return { message };
    }
    async verifyResetToken(token) {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        const user = await this.userService.findByResetToken(hashedToken);
        if (!user) {
            return { valid: false, message: 'Invalid or expired token' };
        }
        if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
            return { valid: false, message: 'Token expired' };
        }
        return { valid: true, message: 'Token is valid' };
    }
    async resetPassword(resetPasswordDto) {
        const { token, newPassword, confirmPassword } = resetPasswordDto;
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException('Passwords do not match');
        }
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
        await this.userService.resetPassword(hashedToken, newPassword);
        return { message: 'Password reset successfully' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map