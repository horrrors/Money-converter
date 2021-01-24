import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/CreateUserDto';
import { AuthService } from './auth.service';
import { LoginDto } from './interfaces/LoginDto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('registration')
    public async registration(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto)
    }

    @Post('login')
    public async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

}
