import {
    Entity,
    PrimaryGeneratedColumn,
    Column,

} from 'typeorm';
import { MoneyTypes } from '../enums/MoneyTypes';

@Entity('Wallet')
export class WalletEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    user_id: number;

    @Column({
        type: "enum", enum: MoneyTypes, nullable: false
    })
    type: MoneyTypes

    @Column({ type: "decimal", default: 0 })
    amount: number


    constructor(partial: Partial<WalletEntity>) {
        Object.assign(this, partial);
    }
}