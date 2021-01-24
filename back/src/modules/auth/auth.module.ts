import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './guards/jwt.strategy';

@Module({
    imports: [
        UserModule,
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
            }),
            inject: [ConfigService],
        })],
    controllers: [
        AuthController,],
    providers: [
        AuthService, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule { }
