import {
  Controller,
  Get,
  Put,
  Delete,
  Post,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';
import { ForgotPasswordDto } from '../auth/dto/forgot-password.dto';

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * GET /api/user/profile
   * Returns current user details. Protected by JWT.
   */
  @UseGuards(JwtAuthGuard)
  @Get('user/profile')
  async getProfile(@Req() req) {
    // req.user is populated by JwtStrategy
    const user = await this.userService.findOneById(req.user.id);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Remove sensitive data before sending
    const { password, resetPasswordToken, resetPasswordExpires, ...result } =
      user;

    return {
      user: {
        ...result,
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      },
    };
  }

  /**
   * PUT /api/user/profile
   * Updates name, email, phone or company.
   */
  @UseGuards(JwtAuthGuard)
  @Put('user/profile')
  async updateProfile(@Req() req, @Body() body: UpdateProfileDto) {
    const user = await this.userService.updateProfile(req.user.id, body);
    const { password, resetPasswordToken, resetPasswordExpires, ...result } =
      user;

    return {
      success: true,
      message: 'Profile updated successfully',
      user: result,
    };
  }

  /**
   * PUT /api/user/change-password
   * Changes password using current password.
   */
  @UseGuards(JwtAuthGuard)
  @Put('user/change-password')
  async changePassword(@Req() req, @Body() body: ChangePasswordDto) {
    await this.userService.changePassword(req.user.id, body);
    return {
      success: true,
      message: 'Password has been changed successfully',
    };
  }

  /**
   * DELETE /api/user/account
   * Permanently removes the user account.
   */
  @UseGuards(JwtAuthGuard)
  @Delete('user/account')
  @HttpCode(HttpStatus.NO_CONTENT) // 204 No Content
  async deleteAccount(@Req() req) {
    await this.userService.deleteAccount(req.user.id);
  }

  /**
   * POST /api/forgot-password
   * Public route to initiate password reset.
   */
  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    const message = await this.userService.forgotPassword(body.email);
    return { success: true, message };
  }

  /**
   * POST /api/reset-password
   * Public route to save new password using token.
   */
  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    if (body.newPassword !== body.confirmPassword) {
      throw new BadRequestException(
        'New password and confirmation do not match',
      );
    }

    // Hash the token before looking it up (same way it was hashed when stored)
    const crypto = require('crypto');
    const hashedToken = crypto
      .createHash('sha256')
      .update(body.token)
      .digest('hex');

    await this.userService.resetPassword(hashedToken, body.newPassword);

    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }
}
