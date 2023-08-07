import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { RequestUserProfileDTO } from '../dto/request-user-profile.dto';

@Injectable()
export class UserProfileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => plainToClass(RequestUserProfileDTO, data, { excludeExtraneousValues: true }))
    );
  }
}