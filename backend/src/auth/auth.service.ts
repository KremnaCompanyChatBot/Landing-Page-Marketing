import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as crypto from 'crypto';
import { OAuth2Client } from 'google-auth-library';

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
      isGoogleUser: user.isGoogleUser,
    });
    if (user.isGoogleUser && !user.password) {
      console.log('[AuthService] User is Google-only user without password');
      throw new BadRequestException('This account was created with Google. Please use Google Sign-In.');
    }
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

  async validateGoogleTokenAndLogin(googleToken: string) {
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
      if (!user) {
        throw new BadRequestException('Failed to create or find user');
      }
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

  async findOrCreateGoogleUser(googleUser: any) {
    let user = await this.userService.findByEmail(googleUser.email);
    if (!user) {
      const result = await this.userService.create({
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        googleId: googleUser.googleId,
        isGoogleUser: true,
      });
      user = Array.isArray(result) ? result[0] : result;
    } else if (!user.isGoogleUser) {
      user.googleId = googleUser.googleId;
      user.isGoogleUser = true;
      const result = await this.userService.create(user);
      user = Array.isArray(result) ? result[0] : result;
    }
    return user;
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
