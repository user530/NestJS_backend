import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BeforeInsert, JoinColumn } from 'typeorm';
import { UserAccount } from './user-account.entity'

@Entity({ name: 'profile' })
export class UserProfile {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column()
    about: string;

    @OneToOne(() => UserAccount, account => account.profile, { onDelete: 'CASCADE' })
    @JoinColumn()
    account: UserAccount

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeInsert()
    setUpdateDate() {
        this.updatedAt = new Date();
    }
}