import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticatedUserGuard, AuthorizedUserGuard } from 'src/auth/guards';
import { CreateUserProfileDTO, UpdateUserProfileDTO } from 'src/shared-db/dtos';
import { UserProfileInterceptor } from 'src/shared-db/interceptors/user-profile/user-profile.interceptor';
import { UserProfileService } from 'src/shared-db/services/user-profile/user-profile.service';

@Controller('users/:id/profile')
@UseGuards(AuthenticatedUserGuard, AuthorizedUserGuard)
@UseInterceptors(UserProfileInterceptor)
export class UserProfileController {

    constructor(private readonly userProfileService: UserProfileService) { }

    @Get()
    getProfile(@Param('id', ParseIntPipe) id: number) {

        return this.userProfileService.findProfile(id);
    }

    @Post()
    addProfile(@Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDTO: CreateUserProfileDTO) {

        return this.userProfileService.addProfile(id, createUserProfileDTO);
    }

    @Patch()
    updateProfile(@Param('id', ParseIntPipe) id: number,
        @Body() updateUserProfileDTO: UpdateUserProfileDTO) {

        return this.userProfileService.updateProfile(id, updateUserProfileDTO);
    }

    @Delete()
    deleteProfile(@Param('id', ParseIntPipe) id: number) {

        return this.userProfileService.deleteProfile(id);
    }
}

