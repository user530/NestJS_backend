import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserAccount } from 'src/users/user-account/user-account.entity';
import { AccessTokenPayload } from './auth.interface';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @Post('login')
    @HttpCode(200)
    async signIn(@Body() authLoginDto: AuthLoginDTO, @Res() response: Response) {
        const userAccount: UserAccount = await this.authService.validateLoginDTO(authLoginDto);

        const accessToken: string = this.authService.generateAccessToken(userAccount);
        const refreshToken: string = this.authService.generateRefreshToken(userAccount);

        response.cookie('access_token', accessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 });
        response.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 });

        return response.send({ message: 'Logged in successfully!' });
    }

    @Post('logout')
    logout() {
        console.log('Log out!');
    }

    @Post('ref')
    refresh() {
        console.log('Refresh!');
    }
}
