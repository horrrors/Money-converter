export interface CreateConvertOrderDto {
    id_from: number;
    id_to: number;
    desired_rate: number;
    amount: number;
    date_time: Date;
}