import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WalletEntity } from './models/wallet.entity';

@Module({
    imports: [TypeOrmModule.forFeature([WalletEntity])],
    controllers: [
        WalletController,],
    providers: [
        WalletService,],
})
export class WalletModule { }
