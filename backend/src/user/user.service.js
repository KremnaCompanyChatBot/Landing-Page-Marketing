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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const bcrypt = __importStar(require("bcrypt"));
let UserService = class UserService {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getProfile(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const { password, resetPasswordToken, resetPasswordExpires, ...profile } = user;
        return profile;
    }
    async updateProfile(userId, updateProfileDto) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (updateProfileDto.email && updateProfileDto.email !== user.email) {
            const existingUser = await this.userRepository.findOne({
                where: { email: updateProfileDto.email },
            });
            if (existingUser) {
                throw new common_1.BadRequestException('Email already in use');
            }
        }
        Object.assign(user, updateProfileDto);
        await this.userRepository.save(user);
        return user;
    }
    async changePassword(userId, changePasswordDto) {
        const { currentPassword, newPassword, confirmPassword } = changePasswordDto;
        if (newPassword !== confirmPassword) {
            throw new common_1.BadRequestException('New password and confirm password do not match');
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isPasswordValid = await user.validatePassword(currentPassword);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Current password is incorrect');
        }
        const isSamePassword = await bcrypt.compare(newPassword, user.password);
        if (isSamePassword) {
            throw new common_1.BadRequestException('New password must be different from current password');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await this.userRepository.save(user);
        return { message: 'Password changed successfully' };
    }
    async deleteAccount(userId) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        await this.userRepository.remove(user);
        return { message: 'Account deleted successfully' };
    }
    async findByEmail(email) {
        return this.userRepository.findOne({ where: { email } });
    }
    async saveResetToken(userId, token, expires) {
        await this.userRepository.update(userId, {
            resetPasswordToken: token,
            resetPasswordExpires: expires,
        });
    }
    async findByResetToken(token) {
        return this.userRepository.findOne({
            where: { resetPasswordToken: token },
        });
    }
    async resetPassword(token, newPassword) {
        const user = await this.findByResetToken(token);
        if (!user) {
            throw new common_1.BadRequestException('Invalid or expired reset token');
        }
        if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
            throw new common_1.BadRequestException('Reset token has expired');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetPasswordToken = null;
        user.resetPasswordExpires = null;
        await this.userRepository.save(user);
    }
    async findOneById(id) {
        return this.userRepository.findOne({ where: { id } });
    }
    async findOneByEmail(email) {
        return this.findByEmail(email);
    }
    async create(userData) {
        const user = this.userRepository.create(userData);
        return this.userRepository.save(user);
    }
    async findUserByResetToken(token) {
        return this.findByResetToken(token);
    }
    async forgotPassword(email) {
        const user = await this.findByEmail(email);
        if (!user) {
            return 'If your email is registered, you will receive a password reset link';
        }
        const crypto = require('crypto');
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashedToken = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');
        const expires = new Date(Date.now() + 60 * 60 * 1000);
        await this.saveResetToken(user.id, hashedToken, expires);
        console.log('\n========================================');
        console.log('PASSWORD RESET TOKEN GENERATED');
        console.log('========================================');
        console.log('Email:', email);
        console.log('Reset Token:', resetToken);
        console.log('Reset URL:', `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`);
        console.log('Token expires in: 1 hour');
        console.log('========================================\n');
        return 'If your email is registered, you will receive a password reset link';
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
//# sourceMappingURL=user.service.js.map