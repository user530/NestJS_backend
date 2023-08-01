import { Injectable } from '@nestjs/common';
import { CreateUserAccountDTO, UpdateUserAccountDTO } from './dto/';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccount } from './user-account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAccountService {
    constructor(
        @InjectRepository(UserAccount)
        private accountsRepository: Repository<UserAccount>,
    ) { }


    async findAllAccounts(): Promise<UserAccount[]> {
        console.log('GET ALL ACCOUNTS FIRED!');

        const users = await this.accountsRepository.find();
        console.log(users);

        return users;
    }

    addAccount(createUserAcountDTO: CreateUserAccountDTO) {
        console.log('ADD NEW ACCOUNT FIRED!');
        console.log(createUserAcountDTO);
        return 'ADD NEW ACCOUNT FIRED!';
    }

    findOneAccount(id: number) {
        console.log('GET SINGLE ACCOUNT FIRED!');
        console.log(id);
        return 'GET SINGLE ACCOUNT FIRED!';
    }

    updateAccount(id: number, updateUserAccountDTO: UpdateUserAccountDTO) {
        console.log('UPDATE ACCOUNT FIRED!');
        console.log(id)
        console.log(updateUserAccountDTO);
        return 'UPDATE ACCOUNT FIRED!';
    }

    deleteAccount(id: number) {
        console.log('DELETE ACCOUNT FIRED!');
        console.log(id);
        return 'DELETE ACCOUNT FIRED!'
    }
}
