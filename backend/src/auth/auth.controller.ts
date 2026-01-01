import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import * as bcrypt from 'bcryptjs';

@Controller('api')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() body: any = {}) {
    const { email, password, firstName, lastName, companyName } = body;
    if (!email || !password) {
      throw new BadRequestException('Email and password are required.');
    }
    const existingUser = await this.userService.findOneByEmail(email);
    if (existingUser) {
      return {
        success: false,
        message: 'This email is already registered.',
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await this.userService.create({
      firstName,
      lastName,
      email,
      companyName,
      password: hashedPassword,
    });
    return {
      success: true,
      message: 'Account created successfully.',
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any = {}) {
    if (!body || !body.email || !body.password) {
      throw new BadRequestException('Email and password are required.');
    }
    return this.authService.login(body.email, body.password);
  }

  @Post('auth/google')
  @HttpCode(HttpStatus.OK)
  async googleLogin(@Body() body: any = {}) {
    const { googleToken } = body;
    if (!googleToken) {
      throw new BadRequestException('googleToken is required.');
    }
    return this.authService.validateGoogleTokenAndLogin(googleToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@Req() req: any) {
    const user = await this.userService.findOneById(req.user.id);
    return {
      user: {
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        companyName: user?.companyName,
        fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim(),
      },
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout() {
    return {
      success: true,
      message: 'Logged out successfully.',
    };
  }
}
