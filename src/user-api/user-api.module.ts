import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { SharedDbModule } from 'src/shared-db/shared-db.module';
import { UserAccountController, UserProfileController } from './controllers';

@Module({
  imports: [
    SharedDbModule,
    AuthModule
  ],
  controllers: [
    UserAccountController,
    UserProfileController
  ],
})
export class UserApiModule { }
