import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UserService, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        success: boolean;
        message?: string;
        token?: string;
    }>;
    validateGoogleTokenAndLogin(googleToken: string): Promise<{
        success: boolean;
        token?: string;
        message?: string;
    }>;
    findOrCreateGoogleUser(googleUser: any): Promise<any>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    verifyResetToken(token: string): Promise<{
        valid: boolean;
        message: string;
    }>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
