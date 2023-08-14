import { CreateUserAccountDTO } from './create-user-account.dto';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUserAccountDTO extends PartialType(CreateUserAccountDTO) {
    @IsNotEmpty()
    @IsEmail()
    email?: string;

    @IsNotEmpty()
    @IsStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
        { message: 'The password must be at least 6 characters long and include one uppercase letter, one lowercase letter, one number and one symbol!' })
    password?: string;
}