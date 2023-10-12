import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ExtendedRequest } from 'src/auth/auth.interface';
import { AuthService } from 'src/auth/auth.service';
import { MinRequestUserAccountDTO } from 'src/shared-db/dtos/user-account';
import { UserAccount } from 'src/shared-db/entities';

@Injectable()
export class AuthenticatedUserGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    try {
      const request: ExtendedRequest = context.switchToHttp().getRequest();

      const token: string = request.cookies['access_token'];

      if (!token)
        throw new Error;

      const user: UserAccount = await this.authService.verifyToken(token);

      request.user = plainToClass(MinRequestUserAccountDTO, user, { excludeExtraneousValues: true });

      return true;
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
