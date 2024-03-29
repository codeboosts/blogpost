import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class UserRegisterInputDto {
    @IsNotEmpty()
    @IsString()
    Fullname: string;

    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @IsNotEmpty()
    @IsStrongPassword()
    Password: string;
}

export class SendOTPInputDto {
    @IsNotEmpty()
    @IsEmail()
    Email: string;
}

export class VerifyEmailInputDto {
    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @IsNotEmpty()
    @IsString()
    OTP: string;
}

export class LoginInputDto {
    @IsNotEmpty()
    @IsEmail()
    Email: string;

    @IsNotEmpty()
    @IsString()
    Password: string;
}

export class ChangePasswordInputDto {
    @IsNotEmpty()
    @IsString()
    Password: string;

    @IsNotEmpty()
    @IsString()
    NewPassword: string;
}

export class ChangeEmailInputDto {
    @IsNotEmpty()
    @IsString()
    NewEmail: string;

    @IsNotEmpty()
    @IsString()
    Password: string;
}

export class UpdateUserInputDto {
    @IsNotEmpty()
    @IsString()
    Fullname: string;
}

export class ForgotPasswordInputDto {
    @IsNotEmpty()
    @IsString()
    Email: string;
}

export class ResetPasswordInputDto {
    @IsNotEmpty()
    @IsString()
    Email: string;

    @IsNotEmpty()
    @IsString()
    OTP: string;

    @IsNotEmpty()
    @IsStrongPassword()
    Password: string;
}
