import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate } from 'typeorm';
import { UserProfile } from '../user-profile/user-profile.entity';
import { randomBytes, pbkdf2Sync } from 'crypto'

@Entity()
export class UserAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    salt: string

    @OneToOne(() => UserProfile, (profile) => profile.userAccount, { cascade: true })
    @JoinColumn()
    userProfile: UserProfile;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @BeforeInsert()
    generateSaltAndHashPassword() {
        this.salt = randomBytes(16).toString('hex');
        this.password = this.hashPasswordWithSalt(this.password, this.salt)
    }

    @BeforeUpdate()
    setUpdateDate() {
        this.updatedAt = new Date();
    }

    private hashPasswordWithSalt(password: string, salt: string) {
        return pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    }
}

