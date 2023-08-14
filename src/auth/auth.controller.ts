import { Body, Controller, HttpCode, Post, Redirect, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDTO } from './dto';
import { UserAccount } from 'src/shared-db/entities';
import { Request, Response } from 'express';
import { AuthenticatedUserGuard } from './guards';


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
    @UseGuards(AuthenticatedUserGuard)
    @Redirect('/')
    logout(@Res() response: Response) {
        response.clearCookie('access_token');
        response.clearCookie('refresh_token');
    }

    @Post('refresh')
    @HttpCode(200)
    async refresh(@Req() request: Request, @Res() response: Response) {
        try {
            const refreshToken: string = request.cookies['refresh_token'];

            const user: UserAccount = await this.authService.verifyToken(refreshToken);

            const newAccessToken: string = this.authService.generateAccessToken(user);
            const newRefreshToken: string = this.authService.generateRefreshToken(user);

            response.cookie('access_token', newAccessToken, { httpOnly: true, maxAge: 1000 * 60 * 60 })
            response.cookie('refresh_token', newRefreshToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 * 30 })

            response.json({ message: 'Token refreshed successfully!' });
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token!');
        }
    }
}
