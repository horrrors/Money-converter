import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from '../user/dto/CreateUserDto';
import { UserService } from '../user/user.service';
import { LoginDto } from './interfaces/LoginDto';
import { sign } from 'jsonwebtoken';
import { toUserDto } from '../../../src/utils/utils';
import { UserDto } from '../user/dto/UserDto';
import { Payload } from './interfaces/Payload';


@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly configService: ConfigService
    ) { }

    public async register(createUserDto: CreateUserDto) {
        const user = await this.userService.findByEmail(createUserDto.email);

        if (user)
            throw new HttpException(
                'Found user',
                HttpStatus.CONFLICT
            )

        const createdUser = await this.userService.createUser(createUserDto)
        if (createdUser && createdUser.id)
            return 'Registration success'
        else
            throw new HttpException(
                'Cant create user by server error',
                HttpStatus.INTERNAL_SERVER_ERROR
            )

    }

    public async login(loginDto: LoginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.password)
        return this.createToken(user)

    }

    public async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (!user)
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);

        const isCorrectPassword = await user.comparePassword(password);

        if (!isCorrectPassword)
            throw new HttpException('Wrong password', HttpStatus.UNAUTHORIZED);

        return toUserDto(user);
    }

    private async createToken(user: UserDto) {
        const secret = this.configService.get<string>('JWT_SECRET');

        if (!secret) {
            throw new HttpException('No Secret in token', HttpStatus.INTERNAL_SERVER_ERROR)
        }
        const payload: Payload = { email: user.email, id: user.id }
        const accessToken = sign(payload, secret);
        return accessToken;
    }

}
