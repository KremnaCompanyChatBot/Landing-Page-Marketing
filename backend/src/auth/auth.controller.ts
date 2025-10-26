import { Controller, Post, Body, Get, UseGuards, Req, Res, HttpStatus, HttpCode, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'; 
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
  async register(@Body() body: any) {
    const { email, password, firstName, lastName, companyName } = body;

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

    return { success: true, message: 'Hesap başarıyla oluşturuldu' };
  }

  // POST /api/login
  @Post('login')
  @HttpCode(HttpStatus.OK) 
  async login(@Body() body: any) {
    const { email, password } = body;
    const authResult = await this.authService.login(email, password);
    return authResult; 
  }

  @UseGuards(JwtAuthGuard) 
  @Get('user')
  @HttpCode(HttpStatus.OK)
  getUserInfo(@Req() req) {
    if (!req.user) {
        throw new UnauthorizedException('User not found after guard validation');
    }
    return {
        user: {
            id: req.user.id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email,
            companyName: req.user.companyName
        }
    };
  }

  @UseGuards(JwtAuthGuard) 
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Req() req) {
    console.log(`User ${req.user.email} logged out.`); 
    return { success: true, message: 'Başarıyla çıkış yapıldı' };
  }


  @Get('google')
  @UseGuards(GoogleOAuthGuard) 
  async googleAuth(@Req() req) {
  }

  @Get('google/callback')
  @UseGuards(GoogleOAuthGuard) 
  googleAuthRedirect(@Req() req, @Res() res) {
    if (!req.user) {
        return res.redirect('http://localhost:5173/login-failure'); // Örnek URL
    }

    const { token } = this.authService.generateJwtToken(req.user);

    const frontendCallbackUrl = `http://localhost:5173/auth/callback#token=${token}`; // Örnek frontend callback URL'si
    return res.redirect(frontendCallbackUrl);
  }
}

