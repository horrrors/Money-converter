import { ConvertOrderService } from './convertOrder.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConvertOrderEntity } from './models/convertOrder.entity';
import { WalletModule } from '../wallet/wallet.module';
import { ConvertOrderController } from './convertOrder.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([ConvertOrderEntity]),
        WalletModule
    ],
    controllers: [ConvertOrderController],
    providers: [
        ConvertOrderService,],
})
export class ConvertOrderModule { }
