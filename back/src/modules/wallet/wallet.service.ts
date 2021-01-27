import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UserDto } from '../user/dto/UserDto';
import { CreateWalletDto } from './dto/CreateWalletDto';
import { WalletEntity } from './models/wallet.entity';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(WalletEntity)
        private readonly walletRepository: Repository<WalletEntity>,
        private connection: Connection
    ) { }

    public getAllUserWallets(user: UserDto) {
        return this.walletRepository.find({ user_id: user.id })
    }

    public createWallet(createWalletDto: CreateWalletDto) {
        const wallet = this.walletRepository.create(createWalletDto)
        return this.walletRepository.save(wallet)
    }

    public getWalletById(id) {
        return this.walletRepository.findOne({ id })
    }

    public async transferMoney(from: WalletEntity, to: WalletEntity) {
        await this.connection.transaction(async manager => {
            await manager.update(WalletEntity, { id: from.id }, { amount: from.amount })
            await manager.update(WalletEntity, { id: to.id }, { amount: to.amount })
        });
    }
}
