import { Module } from '@nestjs/common';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';
import { UserAccount } from '../user-account/user-account.entity';
import { UserProfileInterceptor } from './interceptors/user-profile.interceptor';

@Module({
    imports: [TypeOrmModule.forFeature([UserProfile, UserAccount])],
    controllers: [UserProfileController],
    providers: [UserProfileService, UserProfileInterceptor]
})
export class UserProfileModule { }
