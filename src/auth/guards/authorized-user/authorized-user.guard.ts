import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ExtendedRequest } from 'src/auth/auth.interface';

@Injectable()
export class AuthorizedUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    try {

      console.log('Authorized guard - Fired')

      const request: ExtendedRequest = context.switchToHttp().getRequest();

      const { id } = request.user;

      console.log('Authorized guard - ID ', id)

      const requestParamId: string = request.params.id;

      console.log('Authorized guard - param ID ', requestParamId)

      if (!requestParamId || requestParamId !== id.toString())
        throw new UnauthorizedException();

      console.log('Authorized guard - success');
      console.log(`Id is ${id}, request param is ${requestParamId}`);

      return true;
    } catch (error) {
      console.log('Authorized guard - failed');
      return false;
    }
  }
}
