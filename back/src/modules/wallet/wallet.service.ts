import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../user/dto/UserDto';
import { CreateWalletDto } from './dto/CreateWalletDto';
import { WalletEntity } from './models/wallet.entity';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletRepository: Repository<WalletEntity>
    ) { }

    public getAllUserWallets(user: UserDto) {
        return this.walletRepository.find({ user_id: user.id })
    }

    public createWallet(createWalletDto: CreateWalletDto) {
        const wallet = this.walletRepository.create(createWalletDto)
        return this.walletRepository.save(wallet)
    }
}
