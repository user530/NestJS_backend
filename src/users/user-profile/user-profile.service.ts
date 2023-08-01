import { Injectable } from '@nestjs/common';
import { CreateUserProfileDTO, UpdateUserProfileDTO } from './dto';

@Injectable()
export class UserProfileService {
    findProfile(id: number) {
        console.log('FIND PROFILE FIRED!');
        console.log('ID - ', id);

        return 'FIND PROFILE FIRED!';
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
