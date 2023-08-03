import { Module } from '@nestjs/common';
import { UserAccountController } from './user-account.controller';
import { UserAccountService } from './user-account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from './user-account.entity';
import { UserAccountInterceptor } from './interceptors/user-account.interceptor';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserAccount])
    ],
    controllers: [UserAccountController],
    providers: [UserAccountService, UserAccountInterceptor]
})
export class UserAccountModule { }
