/* eslint-disable @typescript-eslint/camelcase */

import { MoneyTypes } from '@/store/modules/wallet/interfaces/MoneyTypes'
import axios from 'axios'

export const getMoneyRate = (from: MoneyTypes, to: MoneyTypes) => {
    const params = {
        function: "CURRENCY_EXCHANGE_RATE",
        apikey: "JZ01R6V0YCBCWBCB",
        from_currency: from,
        to_currency: to

    };
    return axios.get('https://www.alphavantage.co/query', { params })
}