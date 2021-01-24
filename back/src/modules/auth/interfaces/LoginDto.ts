import { IsEmail, Length } from "class-validator";

export class LoginDto {
    @IsEmail()
    email: string;

    @Length(7, 20)
    password: string;
}