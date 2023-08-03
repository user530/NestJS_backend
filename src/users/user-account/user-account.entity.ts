import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, BeforeInsert, BeforeUpdate, AfterLoad } from 'typeorm';
import { UserProfile } from '../user-profile/user-profile.entity';
import { randomBytes, pbkdf2Sync } from 'crypto'

@Entity({ name: 'account' })
export class UserAccount {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ unique: true })
    public email: string

    @Column()
    public password: string

    @Column()
    public salt: string

    @OneToOne(() => UserProfile, (profile) => profile.userAccount, { cascade: true })
    @JoinColumn()
    public userProfile: UserProfile;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public updatedAt: Date;

    @BeforeInsert()
    private generateSaltAndHashPassword(): void {
        this.salt = randomBytes(16).toString('hex');
        this.password = this.hashPasswordWithSalt(this.password)
    }

    @BeforeUpdate()
    private setUpdateDate(): void {
        this.updatedAt = new Date();
    }

    public hashPasswordWithSalt(password: string): string {
        return pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    }
}

