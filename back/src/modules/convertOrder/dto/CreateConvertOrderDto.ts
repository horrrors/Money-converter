export class CreateConvertOrderDto {
    id_from: number
    id_to: number
    id_user?: number
    desiredRate: number
    amount: number
    date_time: Date
}