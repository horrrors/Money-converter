import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { CreateConvertOrderDto } from './dto/CreateConvertOrderDto';
import { ConvertOrderEntity } from './models/convertOrder.entity';
import { requestExchangeRate } from '../../utils/exchangeRateApi'
import { GetExchangeRateDto } from './dto/GetExchangeRateDto';
import { StatusTypes } from './enums/StatusTypes';
import { WalletService } from '../wallet/wallet.service';

@Injectable()
export class ConvertOrderService {
    constructor(
        @InjectRepository(ConvertOrderEntity)
        private readonly convertOrderRepository: Repository<ConvertOrderEntity>,
        private readonly walletService: WalletService
    ) { }

    @Cron('* * * * *')
    private async backgroundConvertingProcess() {
        const activeOrders = await this.getActiveConvertOrders()
        for (const activeOrder of activeOrders) {
            await this.convertingOrderProcess(activeOrder)
        }

    }

    private async convertingOrderProcess(convertOrder: ConvertOrderEntity) {
        const [fromWallet, toWallet] = await Promise.all([
            this.walletService.getWalletById(convertOrder.id_from),
            this.walletService.getWalletById(convertOrder.id_to)
        ])

        const { rate: currentRate } = await this.getExchangeRate({
            from: fromWallet.type,
            to: toWallet.type
        })

        const rateEqualOrGreater = Number(currentRate) >= Number(convertOrder.desired_rate)
        if (!rateEqualOrGreater) return


        const isEnoughtMoney = Number(fromWallet.amount) >= Number(convertOrder.amount)
        if (!isEnoughtMoney) return

        const fromWalletNewBalance = {
            ...fromWallet,
            amount: Number(fromWallet.amount) - Number(convertOrder.amount)
        }

        const toWalletNewBalance = {
            ...toWallet,
            amount: Number(toWallet.amount) + Number(convertOrder.amount) * currentRate
        }

        try {
            this.setConvertOrderStatus(convertOrder, StatusTypes.IN_PROCESS)
            await this.walletService.transferMoney(fromWalletNewBalance, toWalletNewBalance)
            this.setConvertOrderStatus(convertOrder, StatusTypes.FINISHED)
        } catch (err) {
            console.error(err)
        }


    }

    public async getExchangeRate(getExchangeRateDto: GetExchangeRateDto) {
        return requestExchangeRate(getExchangeRateDto.from, getExchangeRateDto.to)
    }

    public createConvertOrder(createConvertOrderDto: CreateConvertOrderDto) {
        const convertOrder = this.convertOrderRepository.create(createConvertOrderDto)
        return this.convertOrderRepository.save(convertOrder)
    }

    private setConvertOrderStatus(order: ConvertOrderEntity, status: StatusTypes) {
        return this.convertOrderRepository.update({ id: order.id }, { status })
    }

    private getActiveConvertOrders() {
        return this.convertOrderRepository.find({
            status: StatusTypes.WAIT_PROCESS,
            date_time: MoreThanOrEqual(new Date())
        })
    }


}
