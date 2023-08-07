import { IsNotEmpty, IsNumber, IsPhoneNumber } from 'class-validator';

export class CreateUserProfileDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    address: string;

    @IsNotEmpty()
    @IsPhoneNumber('RU')
    phone: string;
}