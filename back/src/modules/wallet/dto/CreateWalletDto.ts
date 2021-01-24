import { IsEnum, IsNotEmpty } from "class-validator"
import { MoneyTypes } from "../enums/MoneyTypes"

export class CreateWalletDto {
    @IsNotEmpty()
    amount: number

    @IsNotEmpty()
    @IsEnum(MoneyTypes)
    type: MoneyTypes

    user_id?: number
}