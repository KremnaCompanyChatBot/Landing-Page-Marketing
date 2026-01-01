import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    register(body?: any): Promise<{
        success: boolean;
        message: string;
    }>;
    login(body?: any): Promise<{
        success: boolean;
        message?: string;
        token?: string;
    }>;
    googleLogin(body?: any): Promise<{
        success: boolean;
        token?: string;
        message?: string;
    }>;
    getUserInfo(req: any): Promise<{
        user: {
            id: string | undefined;
            firstName: string | undefined;
            lastName: string | undefined;
            email: string | undefined;
            companyName: string | undefined;
            fullName: string;
        };
    }>;
    logout(): {
        success: boolean;
        message: string;
    };
}
