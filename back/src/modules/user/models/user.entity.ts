import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('User')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, nullable: false, length: 25 })
    email: string;

    @Column({ nullable: false })
    password: string;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(): Promise<void> {
        if (!!this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial);
    }
}