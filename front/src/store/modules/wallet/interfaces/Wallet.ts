import { MoneyTypes } from "../interfaces/MoneyTypes";

export interface Wallet {
    id: number;
    user_id: number;
    amount: number;
    type: MoneyTypes
}