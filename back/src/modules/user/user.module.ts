import { UserService } from './user.service';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    controllers: [],
    providers: [
        UserService,],
    exports: [UserService]
})
export class UserModule { }
