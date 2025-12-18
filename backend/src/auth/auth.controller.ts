import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  HttpStatus,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import * as bcrypt from 'bcryptjs';

@Controller('api')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * POST /api/register
   * Creates a new user in the 'customers' table.
   */
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

    // Hash the password before saving
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

  /**
   * POST /api/login
   * Validates credentials and returns a JWT token.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any = {}) {
    if (!body || !body.email || !body.password) {
      throw new BadRequestException('Email and password are required.');
    }

    return this.authService.login(body.email, body.password);
  }

  /**
   * POST /api/auth/google
   * Validates a Google ID Token and performs login/signup.
   */
  @Post('auth/google')
  @HttpCode(HttpStatus.OK)
  async googleLogin(@Body() body: any = {}) {
    const { googleToken } = body;
    if (!googleToken) {
      throw new BadRequestException('googleToken is required.');
    }
    return this.authService.validateGoogleTokenAndLogin(googleToken);
  }

  /**
   * GET /api/user
   * Returns current logged-in user info (via JWT).
   */
  @UseGuards(JwtAuthGuard)
  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@Req() req) {
    // req.user is populated by JwtStrategy
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

  /**
   * POST /api/logout
   * Placeholder for logout (usually handled on frontend by removing token).
   */
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
