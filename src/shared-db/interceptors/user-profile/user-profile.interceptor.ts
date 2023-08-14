import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { RequestUserProfileDTO } from 'src/shared-db/dtos';


@Injectable()
export class UserProfileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => plainToClass(RequestUserProfileDTO, data, { excludeExtraneousValues: true }))
    );
  }
}
