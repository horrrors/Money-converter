import { HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios'
import { isNumber } from 'class-validator';
import { MoneyTypes } from 'src/modules/wallet/enums/MoneyTypes';

export const requestExchangeRate = async (from: MoneyTypes, to: MoneyTypes) => {
    const params = {
        function: "CURRENCY_EXCHANGE_RATE",
        apikey: "JZ01R6V0YCBCWBCB",
        from_currency: from,
        to_currency: to

    };
    try {
        const { data } = await axios.get('https://www.alphavantage.co/query', { params })
        const rate = Number(data["Realtime Currency Exchange Rate"]["5. Exchange Rate"])
        if (isNumber(rate)) return { rate }
        throw new HttpException('Rate api error', HttpStatus.FAILED_DEPENDENCY)
    } catch (err) {
        console.error(err)
        throw new HttpException('Rate api error', HttpStatus.FAILED_DEPENDENCY)
    }
}