export declare class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
    password: string;
    phoneNumber: string;
    googleId: string;
    isGoogleUser: boolean;
    resetPasswordToken?: string | null;
    resetPasswordExpires?: Date | null;
    createdAt: Date;
    updatedAt: Date;
    validatePassword(password: string): Promise<boolean>;
}
