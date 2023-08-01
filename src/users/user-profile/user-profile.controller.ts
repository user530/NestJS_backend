import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateUserProfileDTO, UpdateUserProfileDTO } from './dto';

@Controller('users/:id/profile')
export class UserProfileController {

    constructor(private readonly userProfileService: UserProfileService) { }

    @Get()
    getProfile(@Param('id', ParseIntPipe) id: number) {

        return this.userProfileService.findProfile(id);
    }

    @Post()
    addProfile(@Param('id', ParseIntPipe) id: number,
        @Body() createUserProfileDTO: CreateUserProfileDTO) {

        return this.userProfileService.addProfile(createUserProfileDTO);
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
