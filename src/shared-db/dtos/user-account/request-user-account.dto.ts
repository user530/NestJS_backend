import { Expose, Type } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { MinRequestUserProfileDTO, RequestUserProfileDTO } from '../user-profile';

export class RequestUserAccountDTO {
    @Expose()
    @IsNotEmpty()
    id: number;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Expose()
    @IsOptional()
    @Type(() => RequestUserProfileDTO)
    profile: RequestUserProfileDTO;

    @Expose({ name: 'createdAt' })
    @IsNotEmpty()
    @IsDateString()
    created_at: Date;

    @Expose({ name: 'updatedAt' })
    @IsNotEmpty()
    @IsDateString()
    updated_at: Date;
}

export class MinRequestUserAccountDTO {
    @Expose()
    @IsNotEmpty()
    id: number;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Expose()
    @IsOptional()
    @Type(() => MinRequestUserProfileDTO)
    profile: RequestUserProfileDTO;
}