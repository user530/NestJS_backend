import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtendedRequest } from 'src/auth/auth.interface';

@Injectable()
export class AuthorizedUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    try {
      const request: ExtendedRequest = context.switchToHttp().getRequest();

      const { id } = request.user;

      const requestParamId: string = request.params.id;

      if (!requestParamId || requestParamId !== id.toString())
        throw new UnauthorizedException();

      return true;
    } catch (error) {
      throw new UnauthorizedException()
    }
  }
}
