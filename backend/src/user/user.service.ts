import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import * as crypto from 'crypto';
import { MailService } from '../mail/mail.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private mailService: MailService,
  ) {}

  async getProfile(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, resetPasswordToken, resetPasswordExpires, ...profile } = user;
    return profile;
  }

  async updateProfile(userId: string, updateData: UpdateProfileDto | any) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateData.email && updateData.email !== user.email) {
      const existingUser = await this.userRepository.findOne({
        where: { email: updateData.email },
      });
      if (existingUser) {
        throw new BadRequestException('Email already in use');
      }
    }

    // support either separate first/last name or a single fullName field
    if (updateData.fullName && !updateData.firstName && !updateData.lastName) {
      const parts = updateData.fullName.trim().split(/\s+/);
      user.firstName = parts[0];
      user.lastName = parts.slice(1).join(' ') || '';
    }

    if (updateData.firstName) user.firstName = updateData.firstName;
    if (updateData.lastName) user.lastName = updateData.lastName;
    if (updateData.phoneNumber) user.phoneNumber = updateData.phoneNumber;
    if (updateData.companyName) user.companyName = updateData.companyName;
    if (updateData.email) user.email = updateData.email?.toLowerCase().trim();

    await this.userRepository.save(user);
    return user;
  }

  async changePassword(userId: string, dto: ChangePasswordDto) {
    const { currentPassword, newPassword, confirmPassword } = dto;
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('New password and confirm password do not match');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user || !user.password) {
      throw new NotFoundException('User not found or local password not set');
    }

    const isPasswordValid = await user.validatePassword(currentPassword);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Current password is incorrect');
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      throw new BadRequestException('New password must be different from current password');
    }

    user.password = await bcrypt.hash(newPassword, 10);
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
    return this.userRepository.findOne({ where: { email: email.toLowerCase().trim() } });
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

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.userRepository.save(user);
  }

  async forgotPassword(email: string) {
    const user = await this.findByEmail(email);
    if (!user) {
      return 'If your email is registered, you will receive a password reset link';
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await this.saveResetToken(user.id, resetToken, expires);
    await this.mailService.sendPasswordReset(user.email, resetToken);

    return 'If your email is registered, you will receive a password reset link';
  }

  async findOneById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return this.findByEmail(email);
  }

  async create(userData: any) {
    const user = this.userRepository.create(userData) as unknown as User;
    if (userData.password) {
      user.password = await bcrypt.hash(userData.password, 10);
    }
    return this.userRepository.save(user);
  }
}