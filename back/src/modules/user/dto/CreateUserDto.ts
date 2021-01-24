import { IsEmail, Length } from 'class-validator';


export class CreateUserDto {
    @IsEmail()
    email: string;

    @Length(7, 20)
    password: string;
}