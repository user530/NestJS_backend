import { Module } from '@nestjs/common';
import { UserProfileController } from './user-profile.controller';
import { UserProfileService } from './user-profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserProfile])],
    controllers: [UserProfileController],
    providers: [UserProfileService]
})
export class UserProfileModule { }
