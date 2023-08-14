import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ExtendedRequest } from 'src/auth/auth.interface';
import { AuthService } from 'src/auth/auth.service';
import { UserAccount } from 'src/shared-db/entities';

@Injectable()
export class AuthenticatedUserGuard implements CanActivate {
  constructor(private readonly authService: AuthService) { }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

    try {
      const request: ExtendedRequest = context.switchToHttp().getRequest();

      const authHeader: string = request.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new Error;

      const token: string = authHeader.split(' ')[1];

      const user: UserAccount = await this.authService.verifyToken(token);

      request.user = { id: user.id, email: user.email };

      return true;

    } catch (error) {

      return false;
    }
  }
}
