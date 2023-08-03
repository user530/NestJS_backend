import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserProfileDTO, UpdateUserProfileDTO } from './dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './user-profile.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserProfile)
        private profileRepository: Repository<UserProfile>
    ) { }

    async findProfile(id: number): Promise<UserProfile> {

        const existingProfile: UserProfile = await this.profileRepository.findOne({
            where: {
                id
            }
        });

        if (!existingProfile)
            throw new NotFoundException('User Profile not found!');


        return existingProfile;
    }

    async addProfile(createUserProfileDTO: CreateUserProfileDTO): Promise<UserProfile> {
        const newProfile: UserProfile = this.profileRepository.create(createUserProfileDTO);

        return this.profileRepository.save(newProfile);
    }

    async updateProfile(id: number, updateUserProfileDTO: UpdateUserProfileDTO): Promise<UserProfile> {

        const existingProfile: UserProfile = await this.profileRepository.findOne({
            where: {
                id
            }
        })

        if (!existingProfile)
            throw new NotFoundException('User Profile not found!')

        if (updateUserProfileDTO.address)
            existingProfile.address = updateUserProfileDTO.address;

        if (updateUserProfileDTO.name)
            existingProfile.name = updateUserProfileDTO.name;

        if (updateUserProfileDTO.phone)
            existingProfile.phone = updateUserProfileDTO.phone;

        return this.profileRepository.save(existingProfile);
    }

    async deleteProfile(id: number): Promise<void> {

        const result: DeleteResult = await this.profileRepository.delete(id);

        if (result.affected === 0)
            throw new NotFoundException('User Profile not found!');
    }
}
