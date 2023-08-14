import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount, UserProfile } from './entities';
import { UserAccountService } from './services/user-account/user-account.service';
import { UserProfileService } from './services/user-profile/user-profile.service';
import { UserAccountInterceptor } from './interceptors/user-account/user-account.interceptor';
import { UserProfileInterceptor } from './interceptors/user-profile/user-profile.interceptor';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserAccount,
            UserProfile
        ]),
    ],
    providers: [
        UserAccountService,
        UserProfileService,
        UserAccountInterceptor,
        UserProfileInterceptor,
    ],
    exports: [
        TypeOrmModule,
        UserAccountService,
        UserProfileService,
        UserAccountInterceptor,
        UserProfileInterceptor,
    ]
})
export class SharedDbModule { }
