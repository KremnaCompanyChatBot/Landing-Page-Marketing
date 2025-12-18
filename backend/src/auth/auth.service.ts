// src/auth/auth.service.ts
import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import * as crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Login method
  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; message?: string; token?: string }> {
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
      isGoogleUser: user.isGoogleUser
    });

    // Check if it's a Google user
    if (user.isGoogleUser && !user.password) {
      console.log('[AuthService] User is Google-only user without password');
      throw new BadRequestException(
        'This account was created with Google. Please use Google Sign-In.',
      );
    }

    // Validate password
    console.log('[AuthService] Validating password...');
    const isPasswordValid = await user.validatePassword(password);
    console.log('[AuthService] Password valid:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT
    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    console.log('[AuthService] Login successful, token generated');

    return {
      success: true,
      token,
    };
  }

  // Google OAuth validation and login
  async validateGoogleTokenAndLogin(
    googleToken: string,
  ): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      const ticket = await googleClient.verifyIdToken({
        idToken: googleToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();
      if (!payload || !payload.email) {
        throw new BadRequestException('Invalid Google token');
      }

      const googleUser = {
        googleId: payload.sub,
        email: payload.email,
        firstName: payload.given_name || 'User',
        lastName: payload.family_name || '',
      };

      const user = await this.findOrCreateGoogleUser(googleUser);

      // Generate JWT
      const jwtPayload = { sub: user.id, email: user.email };
      const token = this.jwtService.sign(jwtPayload);

      return {
        success: true,
        token,
      };
    } catch (error) {
      throw new BadRequestException('Google authentication failed');
    }
  }

  // Find or create Google user
  async findOrCreateGoogleUser(googleUser: any): Promise<any> {
    let user = await this.userService.findByEmail(googleUser.email);

    if (!user) {
      // Create new user
      user = await this.userService.create({
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        googleId: googleUser.googleId,
        isGoogleUser: true,
      });
    } else if (!user.isGoogleUser) {
      // Link existing account with Google
      user.googleId = googleUser.googleId;
      user.isGoogleUser = true;
      await this.userService.create(user); // Update user
    }

    return user;
  }

  // Forgot password
  async forgotPassword(
    forgotPasswordDto: ForgotPasswordDto,
  ): Promise<{ message: string }> {
    const { email } = forgotPasswordDto;
    const message = await this.userService.forgotPassword(email);
    return { message };
  }

  // Verify reset token
  async verifyResetToken(
    token: string,
  ): Promise<{ valid: boolean; message: string }> {
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

  // Reset password
  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<{ message: string }> {
    const { token, newPassword, confirmPassword } = resetPasswordDto;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Passwords do not match');
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
    await this.userService.resetPassword(hashedToken, newPassword);

    return { message: 'Password reset successfully' };
  }
}
