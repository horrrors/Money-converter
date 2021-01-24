
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Payload } from '../interfaces/Payload';
import { UserService } from '../../../../src/modules/user/user.service';
import { toUserDto } from '../../../../src/utils/utils';
import { UserDto } from '../../../../src/modules/user/dto/UserDto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly configService: ConfigService,
        private readonly userService: UserService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET'),

        })
    }

    async validate(payload: Payload): Promise<UserDto> {
        const user = await this.userService.findByEmail(payload.email)
        if (!user)
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        return toUserDto(user)
    }
}