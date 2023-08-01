import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CreateUserAccountDTO, UpdateUserAccountDTO } from './dto';
import { UserAccountService } from './user-account.service';

@Controller('users')
export class UserAccountController {
    constructor(private readonly userAccountService: UserAccountService) { }

    @Get()
    getAllAccounts() {

        return this.userAccountService.findAllAccounts();
    }

    @Post()
    addNewAccount(@Body() createUserAcountDTO: CreateUserAccountDTO) {

        return this.userAccountService.addAccount(createUserAcountDTO);
    }

    @Get(':id')
    getSingleAccount(@Param('id', ParseIntPipe) id: number) {

        return this.userAccountService.findOneAccount(id);
    }

    @Patch(':id')
    updateAccount(@Param('id', ParseIntPipe) id: number,
        @Body() updateUserAccountDTO: UpdateUserAccountDTO) {

        return this.userAccountService.updateAccount(id, updateUserAccountDTO);
    }

    @Delete(':id')
    deleteAccount(@Param('id', ParseIntPipe) id: number) {

        return this.userAccountService.deleteAccount(id);
    }
}
