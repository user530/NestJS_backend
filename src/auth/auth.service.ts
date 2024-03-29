import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAccountService } from 'src/shared-db/services';
import { AuthLoginDTO } from './dto';
import { UserAccount } from 'src/shared-db/entities';
import { AccessTokenPayload, RefreshTokenPayload } from './auth.interface';


@Injectable()
export class AuthService {
    constructor(
        private readonly userAccountService: UserAccountService,
        private readonly jwtService: JwtService
    ) { }

    public async validateLoginDTO(loginDTO: AuthLoginDTO): Promise<UserAccount> {
        try {
            const userAccount: UserAccount = await this.userAccountService.findAccountByEmail(loginDTO.email);

            if (!userAccount)
                throw new UnauthorizedException('Invalid credentials!');

            const passwordMatch: boolean = this.userAccountService.checkAccountPassword(userAccount, loginDTO.password);

            if (!passwordMatch)
                throw new UnauthorizedException('Invalid credentials!');

            return userAccount

        } catch (error) {
            throw error;
        }
    }

    public generateAccessToken(userAccount: UserAccount): string {
        return this.jwtService.sign(
            {
                sub: userAccount.id,
                created_at: userAccount.createdAt,
            });
    }

    public generateRefreshToken(userAccount: UserAccount): string {
        return this.jwtService.sign(
            {
                sub: userAccount.id,
                created_at: userAccount.createdAt,
                type: 'refreshToken',
            },
            { expiresIn: '30d' }
        )
    }

    public async verifyToken(token: string): Promise<UserAccount> {

        try {
            const payload: AccessTokenPayload | RefreshTokenPayload = this.jwtService.verify(token);

            const user: UserAccount = await this.userAccountService.findOneAccount(parseInt(payload.sub, 10));

            if (!user || payload.created_at !== user.createdAt.toISOString())
                throw new Error

            return user;

        } catch (error) {
            throw new UnauthorizedException('Invalid token!');
        }
    }
}
