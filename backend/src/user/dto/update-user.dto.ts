export class UpdateUserDto {
  fullName?: string; 
  email?: string;
  phoneNumber?: string;
  companyName?: string;
}

export class ChangePasswordDto {
  currentPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
}

export class ResetPasswordDto {
  token!: string;
  newPassword!: string;
}

export class ForgotPasswordDto {
  email!: string;
}