import {
    Entity,
    PrimaryGeneratedColumn,
    Column,

} from 'typeorm';
import { StatusTypes } from '../enums/StatusTypes';

@Entity('Convert_order')
export class ConvertOrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    id_user: number

    @Column({ nullable: false })
    id_from: number;

    @Column({ nullable: false })
    id_to: number;

    @Column({ type: "decimal", default: 0 })
    amount: number

    @Column({ type: "decimal", default: 0 })
    desired_rate: number

    @Column({
        type: "enum", enum: StatusTypes, nullable: false, default: StatusTypes.WAIT_PROCESS
    })
    status: StatusTypes

    @Column({ type: 'timestamp' })
    date_time: Date;


    constructor(partial: Partial<ConvertOrderEntity>) {
        Object.assign(this, partial);
    }
}

