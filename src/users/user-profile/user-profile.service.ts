import { Injectable } from '@nestjs/common';
import { CreateUserProfileDTO, UpdateUserProfileDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private profileRepository: Repository<UserProfile>
    ) { }

    async findProfile(id: number): Promise<UserProfile> {
        console.log('FIND PROFILE FIRED!');
        console.log('ID - ', id);

        const profile = await this.profileRepository.findOne({
            where: {
                id
            }
        })

        console.log(profile)

        return profile;
    }

    addProfile(createUserProfileDTO: CreateUserProfileDTO) {
        console.log('ADD PROFILE FIRED!');
        console.log(createUserProfileDTO);

        return 'ADD PROFILE FIRED!';
    }

    updateProfile(id: number, updateUserProfileDTO: UpdateUserProfileDTO) {
        console.log('UPDATE PROFILE FIRED!');
        console.log('ID - ', id);
        console.log(updateUserProfileDTO);

        return 'UPDATE PROFILE FIRED!';
    }

    deleteProfile(id: number) {
        console.log('DELETE PROFILE FIRED!');
        console.log('ID - ', id);

        return 'DELETE PROFILE FIRED!';
    }
}
