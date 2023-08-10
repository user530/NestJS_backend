import { Injectable, ParseIntPipe, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { UserAccountService } from 'src/users/user-account/user-account.service';
import { UserAccount } from 'src/users/user-account/user-account.entity';
import { JwtService } from '@nestjs/jwt';
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
                sub: userAccount.id
            });
    }

    public generateRefreshToken(userAccount: UserAccount): string {
        return this.jwtService.sign(
            {
                sub: userAccount.id,
                type: 'refreshToken',
            },
            { expiresIn: '30d' }
        )
    }

    public async refreshAccessToken(refreshToken: string): Promise<string> {
        try {
            const payload: RefreshTokenPayload = this.jwtService.verify(refreshToken);

            const user: UserAccount = await this.userAccountService.findOneAccount(parseInt(payload.sub, 10));

            if (!user)
                throw new Error

            return this.generateAccessToken(user);

        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token!');
        }

    }

    public async verifyToken(token: string): Promise<UserAccount> {

        try {
            const payload: AccessTokenPayload | RefreshTokenPayload = this.jwtService.verify(token);

            const user: UserAccount = await this.userAccountService.findOneAccount(parseInt(payload.sub, 10));

            if (!user)
                throw new Error

            return user;

        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token!');
        }
    }
}
