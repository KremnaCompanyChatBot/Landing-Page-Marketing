import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    console.log('[AuthService] Login attempt for email:', email);
    const user = await this.userService.findByEmail(email);
    if (!user) {
      console.log('[AuthService] User not found for email:', email);
      throw new UnauthorizedException('Invalid credentials');
    }
    console.log('[AuthService] User found:', {
      id: user.id,
      email: user.email,
      hasPassword: !!user.password,
    });
    console.log('[AuthService] Validating password...');
    const isPasswordValid = await user.validatePassword(password);
    console.log('[AuthService] Password valid:', isPasswordValid);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    console.log('[AuthService] Login successful, token generated');
    return {
      success: true,
      token,
    };
  }



  async forgotPassword(forgotPasswordDto: any) {
    const { email } = forgotPasswordDto;
    const message = await this.userService.forgotPassword(email);
    return { message };
  }

  async verifyResetToken(token: string) {
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

  async resetPassword(resetPasswordDto: any) {
    const { token, newPassword, confirmPassword } = resetPasswordDto;
    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    await this.userService.resetPassword(hashedToken, newPassword);
    return { message: 'Password reset successfully' };
  }
}
