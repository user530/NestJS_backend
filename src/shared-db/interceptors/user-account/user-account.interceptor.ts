import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable, map } from 'rxjs';
import { RequestUserAccountDTO } from 'src/shared-db/dtos';

@Injectable()
export class UserAccountInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: unknown) => {
        if (Array.isArray(data))
          return data.map((item: unknown) => plainToClass(RequestUserAccountDTO, item, { excludeExtraneousValues: true }))

        else return plainToClass(RequestUserAccountDTO, data, { excludeExtraneousValues: true })
      })
    );
  }
}
