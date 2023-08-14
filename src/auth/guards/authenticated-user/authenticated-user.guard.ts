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

      console.log('Authenticated guard - Fired');

      const request: ExtendedRequest = context.switchToHttp().getRequest();

      const authHeader: string = request.headers.authorization;

      console.log('Authenticated guard - Auth header ', authHeader);

      if (!authHeader || !authHeader.startsWith('Bearer '))
        throw new Error;

      const token: string = authHeader.split(' ')[1];

      const user: UserAccount = await this.authService.verifyToken(token);

      request.user = { id: user.id, email: user.email };

      console.log('Authenticated guard - success');
      console.log(user);

      return true;

    } catch (error) {
      console.log('Authenticated guard - failed');
      return false;
    }
  }
}
