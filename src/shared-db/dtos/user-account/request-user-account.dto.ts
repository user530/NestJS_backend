import { Expose } from 'class-transformer';
import { IsDateString, IsEmail, IsNotEmpty } from 'class-validator';

export class RequestUserAccountDTO {
    @Expose()
    @IsNotEmpty()
    id: number;

    @Expose()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Expose({ name: 'createdAt' })
    @IsNotEmpty()
    @IsDateString()
    created_at: Date;

    @Expose({ name: 'updatedAt' })
    @IsNotEmpty()
    @IsDateString()
    updated_at: Date;
}