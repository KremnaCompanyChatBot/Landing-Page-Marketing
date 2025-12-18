import { Controller, Get, Put, Delete, Post, Body, UseGuards, Req, Param, HttpCode, HttpStatus, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UpdateUserDto, ChangePasswordDto, ResetPasswordDto, ForgotPasswordDto } from './dto/update-user.dto';

@Controller('api') 
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('user/profile')
  async getProfile(@Req() req) {
    const user = await this.userService.findOneById(req.user.id);
    
    if (!user) {
        throw new UnauthorizedException('User not found after token validation');
    }
    
    const { password, resetPasswordToken, resetPasswordExpires, ...result } = user;
    
    const fullName = `${result.firstName || ''} ${result.lastName || ''}`.trim();

    return { 
      user: {
        ...result,
        fullName: fullName || null,
      }
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/profile')
  async updateProfile(@Req() req, @Body() body: UpdateUserDto) {
    const user = await this.userService.updateProfile(req.user.id, body);
    
    const { password, resetPasswordToken, resetPasswordExpires, ...result } = user;
    
    const fullName = `${result.firstName || ''} ${result.lastName || ''}`.trim();

    return { 
      success: true, 
      message: 'Profile updated successfully', 
      user: { ...result, fullName } 
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/change-password')
  async changePassword(@Req() req, @Body() body: ChangePasswordDto) {
    await this.userService.changePassword(req.user.id, body);
    return { success: true, message: 'Password changed successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/account')
  @HttpCode(HttpStatus.NO_CONTENT) 
  async deleteAccount(@Req() req) {
    await this.userService.deleteAccount(req.user.id);
    return; 
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) { 
    const message = await this.userService.forgotPassword(body.email);
    return { success: true, message };
  }

  @Get('reset-password/:token')
  async checkResetToken(@Param('token') token: string) {
    const valid = await this.userService.validateResetToken(token);
    
    if (valid) {
        return { valid: true, message: "Token is valid" };
    } else {
        throw new BadRequestException("Token is invalid or expired");
    }
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) { 
      await this.userService.resetPassword(body.token, body.newPassword);
      return { success: true, message: 'Password reset successfully' };
  }
}