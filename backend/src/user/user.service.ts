import { Injectable, NotFoundException, BadRequestException, UnauthorizedException } from '@nestjs/common'; // UnauthorizedException eklendi
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import { UpdateUserDto, ChangePasswordDto, ForgotPasswordDto, ResetPasswordDto } from './dto/update-user.dto';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

 async findUserByResetToken(token: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { resetPasswordToken: token },
    });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async update(userId: number, data: Partial<User>): Promise<User> {
    const user = await this.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, data);
    return this.userRepository.save(user);
  }


  async updateProfile(userId: number, updateData: UpdateUserDto): Promise<User> {
    const user = await this.findOneById(userId);
    if (!user) throw new NotFoundException('User not found');

    if (updateData.fullName) {
      const parts = updateData.fullName.trim().split(/\s+/);
      user.firstName = parts[0];
      user.lastName = parts.slice(1).join(' '); // Geri kalanını soyad olarak al
    }
    
    if (updateData.email) user.email = updateData.email;
    if (updateData.phoneNumber) user.phoneNumber = updateData.phoneNumber;
    if (updateData.companyName) user.companyName = updateData.companyName;

    return this.userRepository.save(user);
  }

  async changePassword(userId: number, dto: ChangePasswordDto): Promise<void> {
    const { currentPassword, newPassword, confirmPassword } = dto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('New password and confirm password do not match');
    }

    const user = await this.findOneById(userId);
    if (!user || !user.password) {
      throw new BadRequestException('User has no password set (maybe Google login?)');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Current password is incorrect'); 
    }

    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(newPassword, salt);

    await this.userRepository.save(user);
  }

  async deleteAccount(userId: number): Promise<void> {
    const result = await this.userRepository.delete(userId);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }

  async forgotPassword(email: string): Promise<string> {
    const user = await this.findOneByEmail(email);
    
    if (!user) {
      console.log(`Password reset attempted for unregistered email: ${email}`);
      return "Password reset process started (if email is registered)";
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 3600000);

    await this.userRepository.save(user);

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    console.log(`\n=== [MOCK EMAIL SERVICE] ===`);
    console.log(`To: ${email}`);
    console.log(`Link: ${resetLink}`);
    console.log(`============================\n`);

    return "Password reset process started (if email is registered)";
  }

  async validateResetToken(token: string): Promise<boolean> {
    const user = await this.userRepository.findOne({ 
      where: { resetPasswordToken: token } 
    });

    if (!user || !user.resetPasswordExpires) {
      return false; 
    }

    if (user.resetPasswordExpires < new Date()) {
      return false; 
    }
    
    return true; 
  }


  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { resetPasswordToken: token },
    });

    if (!user) {
      throw new BadRequestException('Invalid token');
    }

    if (!user.resetPasswordExpires || user.resetPasswordExpires < new Date()) {
      throw new BadRequestException('Token expired');
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await this.userRepository.save(user);
  }
}