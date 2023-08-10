import { Body, Controller, HttpCode, Post, Redirect, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { UserAccount } from 'src/users/user-account/user-account.entity';

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
        response.cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 });

        return response.json({ message: 'Logged in successfully!' });
    }

    @Post('logout')
    @Redirect('/')
    logout(@Res() response: Response) {
        response.clearCookie('access_token');
        response.clearCookie('refresh_token');
    }

    @Post('refresh')
    @HttpCode(200)
    async refresh(@Req() request: Request, @Res() response: Response) {

        const refreshToken: string = request.cookies['refresh_token'];

        if (!refreshToken)
            throw new UnauthorizedException('Refresh token not found!');

        const user: UserAccount = await this.authService.verifyToken(refreshToken);

        const newAccessToken: string = this.authService.generateAccessToken(user);
        const newRefreshToken: string = this.authService.generateRefreshToken(user);

        response.cookie('access_token', newAccessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 })
        response.cookie('refresh_token', newRefreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })

        response.json({ message: 'Token refreshed successfully!' });
    }
}
