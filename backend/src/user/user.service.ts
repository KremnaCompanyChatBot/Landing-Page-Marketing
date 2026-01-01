import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, resetPasswordToken, resetPasswordExpires, ...profile } = user;
    return profile;
  }

  async updateProfile(userId: string, updateProfileDto: any) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateProfileDto.email && updateProfileDto.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateProfileDto.email },
      });
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
    }
    Object.assign(user, updateProfileDto);
    await this.userRepository.save(user);
    return user;
  }

  async changePassword(userId: string, changePasswordDto: any) {
    const { currentPassword, newPassword, confirmPassword } = changePasswordDto;
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('New password and confirm password do not match');
    }
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const isPasswordValid = await user.validatePassword(currentPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestException('New password must be different from current password');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await this.userRepository.save(user);
    return { message: 'Password changed successfully' };
  }

  async deleteAccount(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
    return { message: 'Account deleted successfully' };
  }

  async findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async saveResetToken(userId: string, token: string, expires: Date) {
    await this.userRepository.update(userId, {
      resetPasswordToken: token,
      resetPasswordExpires: expires,
    });
  }

  async findByResetToken(token: string) {
    return this.userRepository.findOne({
      where: { resetPasswordToken: token },
    });
  }

  async resetPassword(token: string, newPassword: string) {
    const user = await this.findByResetToken(token);
    if (!user) {
      throw new BadRequestException('Invalid or expired reset token');
    }
    if (user.resetPasswordExpires && user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Reset token has expired');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.userRepository.save(user);
  }

  async findOneById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return this.findByEmail(email);
  }

  async create(userData: any) {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async findUserByResetToken(token: string) {
    return this.findByResetToken(token);
  }

  async forgotPassword(email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      return 'If your email is registered, you will receive a password reset link';
    }
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);
    await this.saveResetToken(user.id, hashedToken, expires);
    console.log('\n========================================');
    console.log('PASSWORD RESET TOKEN GENERATED');
    console.log('========================================');
    console.log('Email:', email);
    console.log('Reset Token:', resetToken);
    console.log(
      'Reset URL:',
      `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password/${resetToken}`,
    );
    console.log('Token expires in: 1 hour');
    console.log('========================================\n');
    return 'If your email is registered, you will receive a password reset link';
  }
}
