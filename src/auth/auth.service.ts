import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    private verifyToken(token: string): AccessTokenPayload | RefreshTokenPayload {
        return this.jwtService.verify(token);
    }
}
