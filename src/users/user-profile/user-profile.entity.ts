import { Entity, PrimaryGeneratedColumn, Column, OneToOne, BeforeInsert } from 'typeorm';
import { UserAccount } from '../user-account/user-account.entity'

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

    @OneToOne(() => UserAccount, account => account.userProfile)
    userAccount: UserAccount

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeInsert()
    setUpdateDate() {
        this.updatedAt = new Date();
    }
}