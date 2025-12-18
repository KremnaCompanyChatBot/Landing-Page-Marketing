import { Controller, Post, Body, Get, UseGuards, Req, Res, HttpStatus, HttpCode, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service'; 
import * as bcrypt from 'bcryptjs';
import { JwtAuthGuard } from './jwt/jwt-auth.guard'; 
import { GoogleOAuthGuard } from './google/google-oauth.guard'; 

@Controller('api') 
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService, 
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
      return { success: false, message: 'This email is already registered.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10); 

    await this.userService.create({
      firstName,
      lastName,
      email,
      companyName,
      password: hashedPassword, 
    });

    return { success: true, message: 'Account created successfully' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) 
  async login(@Body() body: any = {}) {
    const { email, password } = body;

    if (!email || !password) {
      throw new BadRequestException('Email and password are required. Please provide both.');
    }

    const authResult = await this.authService.login(email, password);
    return authResult; 
  }

  @UseGuards(JwtAuthGuard) 
  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@Req() req) {
    if (!req.user) {
        throw new UnauthorizedException('User not found after guard validation');
    }
    
    const user = await this.userService.findOneById(req.user.id);
    
    return {
        user: {
            id: user?.id || req.user.id,
            firstName: user?.firstName || req.user.firstName,
            lastName: user?.lastName || req.user.lastName,
            email: user?.email || req.user.email,
            companyName: user?.companyName || req.user.companyName
        }
    };
  }

  @UseGuards(JwtAuthGuard) 
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req) {
    const email = req.user?.email || 'Unknown';
    console.log(`User ${email} logged out.`); 
    return { success: true, message: 'Successfully logged out' };
  }

  @Get('google')
  @UseGuards(GoogleOAuthGuard) 
  async googleAuth(@Req() req) {}

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard) 
  googleAuthRedirect(@Req() req, @Res() res) {
    if (!req.user) {
        return res.redirect('http://localhost:5173/login-failure');
    }

    const { token } = this.authService.generateJwtToken(req.user);
    const frontendCallbackUrl = `http://localhost:5173/auth/callback#token=${token}`;
    return res.redirect(frontendCallbackUrl);
  }
}