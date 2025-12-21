import { UserService } from './user.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { ResetPasswordDto } from '../auth/dto/reset-password.dto';
import { ForgotPasswordDto } from '../auth/dto/forgot-password.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getProfile(req: any): Promise<{
        user: {
            fullName: string;
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            companyName: string;
            phoneNumber: string;
            googleId: string;
            isGoogleUser: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    updateProfile(req: any, body: UpdateProfileDto): Promise<{
        success: boolean;
        message: string;
        user: {
            id: string;
            firstName: string;
            lastName: string;
            email: string;
            companyName: string;
            phoneNumber: string;
            googleId: string;
            isGoogleUser: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    changePassword(req: any, body: ChangePasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteAccount(req: any): Promise<void>;
    forgotPassword(body: ForgotPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
    resetPassword(body: ResetPasswordDto): Promise<{
        success: boolean;
        message: string;
    }>;
}
