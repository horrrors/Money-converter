import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUserDto';
import { UserEntity } from './models/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) { }

    public findByEmail(email: string) {
        return this.userRepository.findOne({ email })
    }

    public createUser(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user)
    }
}
