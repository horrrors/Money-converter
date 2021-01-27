import { MoneyTypes } from "src/modules/wallet/enums/MoneyTypes";

export class GetExchangeRateDto {
    from: MoneyTypes
    to: MoneyTypes
}