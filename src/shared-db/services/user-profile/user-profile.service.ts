import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserProfileDTO, UpdateUserProfileDTO } from '../../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserProfile, UserAccount } from '../../entities';

@Injectable()
export class UserProfileService {
    constructor(
        @InjectRepository(UserAccount)
        private accountRepository: Repository<UserAccount>,
        @InjectRepository(UserProfile)
        private profileRepository: Repository<UserProfile>
    ) { }

    async findProfile(id: number): Promise<UserProfile> {

        const existingAccount: UserAccount = await this.accountRepository.findOne({
            where: {
                id
            },
            relations: ['profile']
        })

        if (!existingAccount)
            throw new NotFoundException('User Account not found!');

        if (!existingAccount.profile)
            throw new NotFoundException('No Profile associated with this account!');

        return existingAccount.profile;
    }

    async addProfile(id: number, createUserProfileDTO: CreateUserProfileDTO): Promise<UserProfile> {

        const existingAccount: UserAccount = await this.accountRepository.findOne({
            where: {
                id
            },
            relations: ['profile']
        });

        if (!existingAccount)
            throw new NotFoundException('User Account not found!');

        if (existingAccount.profile)
            throw new ConflictException('User already has profile!');

        const newProfile: UserProfile = this.profileRepository.create({
            ...createUserProfileDTO,
            account: existingAccount,
        });

        return this.profileRepository.save(newProfile);
    }

    async updateProfile(id: number, updateUserProfileDTO: UpdateUserProfileDTO): Promise<UserProfile> {
        const existingAccount: UserAccount = await this.accountRepository.findOne({
            where: {
                id
            },
            relations: ['profile']
        });

        if (!existingAccount)
            throw new NotFoundException('User Account not found!');

        if (!existingAccount.profile)
            throw new NotFoundException('User Profile not found!');

        existingAccount.profile.name = updateUserProfileDTO.name;
        existingAccount.profile.phone = updateUserProfileDTO.phone;
        existingAccount.profile.address = updateUserProfileDTO.address;
        existingAccount.profile.about = updateUserProfileDTO.about;

        return this.profileRepository.save(existingAccount.profile);
    }

    async deleteProfile(id: number): Promise<void> {

        const existingAccount: UserAccount = await this.accountRepository.findOne({
            where: {
                id
            },
            relations: ['profile']
        });

        if (!existingAccount)
            throw new NotFoundException('User Account not found!');

        if (!existingAccount.profile)
            throw new NotFoundException('User Profile not found!');

        const result: DeleteResult = await this.profileRepository.delete(existingAccount.profile.id);

        if (result.affected === 0)
            throw new NotFoundException('User Profile not found!');
    }
}

