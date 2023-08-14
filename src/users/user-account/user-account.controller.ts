import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreateUserAccountDTO, UpdateUserAccountDTO } from './dto';
import { UserAccountService } from './user-account.service';
import { UserAccountInterceptor } from './interceptors/user-account.interceptor';
import { AuthenticatedUserGuard } from 'src/auth/guards/authenticated-user/authenticated-user.guard';

@Controller('users')
@UseInterceptors(UserAccountInterceptor)
export class UserAccountController {
    constructor(private readonly userAccountService: UserAccountService) { }

    @Get()
    @UseGuards(AuthenticatedUserGuard)
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
