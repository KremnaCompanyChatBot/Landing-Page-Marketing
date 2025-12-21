import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
export declare class UserService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    getProfile(userId: string): Promise<Partial<User>>;
    updateProfile(userId: string, updateProfileDto: UpdateProfileDto): Promise<User>;
    changePassword(userId: string, changePasswordDto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    deleteAccount(userId: string): Promise<{
        message: string;
    }>;
    findByEmail(email: string): Promise<User | null>;
    saveResetToken(userId: string, token: string, expires: Date): Promise<void>;
    findByResetToken(token: string): Promise<User | null>;
    resetPassword(token: string, newPassword: string): Promise<void>;
    findOneById(id: string): Promise<User | null>;
    findOneByEmail(email: string): Promise<User | null>;
    create(userData: Partial<User>): Promise<User>;
    findUserByResetToken(token: string): Promise<User | null>;
    forgotPassword(email: string): Promise<string>;
}
