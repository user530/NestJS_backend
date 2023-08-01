import { PartialType } from '@nestjs/mapped-types';
import { CreateUserProfileDTO } from './create-user-profile.dto';
import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class UpdateUserProfileDTO extends PartialType(CreateUserProfileDTO) {
    @IsNotEmpty()
    name?: string;

    @IsNotEmpty()
    address?: string;

    @IsNotEmpty()
    @IsPhoneNumber('RU')
    phone?: string;
}