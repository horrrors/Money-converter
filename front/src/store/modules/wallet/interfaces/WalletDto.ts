import { MoneyTypes } from "../interfaces/MoneyTypes";

export interface CreateWalletDto {
    amount: number;
    type: MoneyTypes
}