import { Controller, Post, Body, HttpCode, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';

interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    password: string;
}

interface LoginDto {
    email: string;
    password: string;
    remember: boolean;
}

@Controller('api') 
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
    ) {}

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() body: RegisterDto) {
        const existingUser = await this.userService.findOneByEmail(body.email);

        if (existingUser) {
            throw new UnauthorizedException({
                success: false,
                message: "This email is already registered. Try logging in.",
            });
        }

        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await this.userService.create({
            ...body,
            password: hashedPassword,
        });
        
        return {
            success: true,
            message: "Hesap başarıyla oluşturuldu",
        };
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() body: LoginDto) {
        const user = await this.authService.validateUser(body.email, body.password);
        
        if (!user) {
             throw new UnauthorizedException({
                success: false,
                message: "Invalid email or password",
            });
        }
        
        const tokenData = await this.authService.login(user);

        return {
            success: true,
            token: tokenData.token,
            user: tokenData.user,
        };
    }
}
