import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserAccountDTO, UpdateUserAccountDTO } from '../../dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAccount } from '../../entities';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserAccountService {
    constructor(
        @InjectRepository(UserAccount)
        private readonly accountsRepository: Repository<UserAccount>
    ) { }


    async findAllAccounts(): Promise<UserAccount[]> {
        const userAccounts: UserAccount[] = await this.accountsRepository.find({ order: { id: 'ASC' } });

        return userAccounts;
    }

    async addAccount(createUserAcountDTO: CreateUserAccountDTO): Promise<UserAccount> {

        const existingAccount: UserAccount = await this.accountsRepository.findOne({
            where: {
                email: createUserAcountDTO.email
            }
        })

        if (existingAccount)
            throw new ConflictException('This email is already in use!');

        const newAccount: UserAccount = await this.accountsRepository.create(createUserAcountDTO);

        return this.accountsRepository.save(newAccount);
    }

    async findOneAccount(id: number): Promise<UserAccount> {

        const existingAccount: UserAccount = await this.accountsRepository.findOne({
            where: {
                id
            }
        })

        if (!existingAccount)
            throw new NotFoundException('User Account not found!');

        return existingAccount;
    }

    async findAccountByEmail(email: string) {

        const existingAccount: UserAccount = await this.accountsRepository.findOne({
            where: {
                email
            }
        });

        if (!existingAccount)
            throw new NotFoundException('User Account not found!');

        return existingAccount
    }

    async updateAccount(id: number, updateUserAccountDTO: UpdateUserAccountDTO) {

        const existingAccount: UserAccount = await this.accountsRepository.findOne({
            where: {
                id
            }
        });

        if (!existingAccount)
            throw new NotFoundException('User Account not found!')

        if (updateUserAccountDTO.password)
            existingAccount.password = existingAccount.hashPasswordWithSalt(updateUserAccountDTO.password);

        if (updateUserAccountDTO.email) {
            const usedEmail: UserAccount = await this.accountsRepository.findOne({
                where: {
                    email: updateUserAccountDTO.email
                }
            })

            if (usedEmail && existingAccount.email !== usedEmail.email)
                throw new ConflictException('This email is already in use!');
            else
                existingAccount.email = updateUserAccountDTO.email;
        }

        return this.accountsRepository.save(existingAccount) as Promise<UserAccount>;
    }

    async deleteAccount(id: number): Promise<void> {

        const user: UserAccount = await this.accountsRepository.findOne({
            where: {
                id
            }
        });

        if (!user)
            throw new NotFoundException('User Account not found!');



        const del = await this.accountsRepository.remove(user);
    }

    checkAccountPassword(account: UserAccount, password: string) {
        return account.hashPasswordWithSalt(password) === account.password
    }
}
