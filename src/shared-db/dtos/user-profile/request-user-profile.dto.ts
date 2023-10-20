import { Injectable } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsPhoneNumber } from 'class-validator';


@Injectable()
export class RequestUserProfileDTO {
    @Expose()
    @IsNotEmpty()
    id: number

    @Expose()
    @IsNotEmpty()
    name: string

    @Expose()
    @IsNotEmpty()
    address: string

    @Expose()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @Expose()
    @IsNotEmpty()
    about: string;

    @Expose({ name: 'createdAt' })
    @IsNotEmpty()
    @IsDateString()
    created_at: Date;

    @Expose({ name: 'updatedAt' })
    @IsNotEmpty()
    @IsDateString()
    updated_at: Date;
}

export class MinRequestUserProfileDTO {
    @Expose()
    @IsNotEmpty()
    name: string

    @Expose()
    @IsNotEmpty()
    address: string

    @Expose()
    @IsNotEmpty()
    @IsPhoneNumber()
    phone: string;

    @Expose()
    @IsNotEmpty()
    about: string;
}