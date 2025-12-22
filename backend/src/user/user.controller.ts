import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';
import { ForgotPasswordDto } from '../auth/dto/forgot-password.dto';

@Controller('api')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user/profile')
  async getProfile(@Req() req: any) {
    const user = await this.userService.findOneById(req.user.id);
    if (!user) {
      throw new Error('User not found');
    }
    const { password, resetPasswordToken, resetPasswordExpires, ...result } = user;
    return {
      user: {
        ...result,
        fullName: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/profile')
  async updateProfile(@Req() req: any, @Body() body: UpdateProfileDto) {
    const user = await this.userService.updateProfile(req.user.id, body);
    const { password, resetPasswordToken, resetPasswordExpires, ...result } = user;
    return {
      success: true,
      message: 'Profile updated successfully',
      user: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/change-password')
  async changePassword(@Req() req: any, @Body() body: ChangePasswordDto) {
    await this.userService.changePassword(req.user.id, body);
    return {
      success: true,
      message: 'Password has been changed successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/account')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAccount(@Req() req: any) {
    await this.userService.deleteAccount(req.user.id);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    const message = await this.userService.forgotPassword(body.email);
    return { success: true, message };
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    if (body.newPassword !== body.confirmPassword) {
      throw new Error('New password and confirmation do not match');
    }
    const crypto = require('crypto');
    const hashedToken = crypto.createHash('sha256').update(body.token).digest('hex');
    await this.userService.resetPassword(hashedToken, body.newPassword);
    return {
      success: true,
      message: 'Password has been reset successfully',
    };
  }
}
