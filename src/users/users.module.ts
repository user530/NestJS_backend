import { Module } from '@nestjs/common';
import { UserAccountModule } from './user-account/user-account.module';
import { UserProfileModule } from './user-profile/user-profile.module';

@Module({
  imports: [UserAccountModule, UserProfileModule]
})
export class UsersModule { }
