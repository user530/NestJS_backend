import { Injectable } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsOptional, IsPhoneNumber } from 'class-validator';


@Injectable()
export class RequestUserProfileDTO {
    @Expose()
    @IsNotEmpty()
    id: number

    @Expose()
    @IsOptional()
    name: string

    @Expose()
    @IsOptional()
    address: string

    @Expose()
    @IsOptional()
    @IsPhoneNumber()
    phone: string;

    @Expose({ name: 'createdAt' })
    @IsNotEmpty()
    @IsDateString()
    created_at: Date;

    @Expose({ name: 'updatedAt' })
    @IsNotEmpty()
    @IsDateString()
    updated_at: Date;
}