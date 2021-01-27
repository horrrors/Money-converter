import { MoneyTypes } from "../../wallet/interfaces/MoneyTypes";

export interface GetExchangeRateDto {
    from: MoneyTypes,
    to: MoneyTypes
}