import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticatedUserGuard } from 'src/auth/guards/authenticated-user/authenticated-user.guard';
import { AuthorizedUserGuard } from 'src/auth/guards/authorized-user/authorized-user.guard';
import { CreateUserAccountDTO, UpdateUserAccountDTO } from 'src/shared-db/dtos';
import { UserAccountInterceptor } from 'src/shared-db/interceptors/user-account/user-account.interceptor';
import { UserAccountService } from 'src/shared-db/services/user-account/user-account.service';

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
    @UseGuards(AuthenticatedUserGuard, AuthorizedUserGuard)
    getSingleAccount(@Param('id', ParseIntPipe) id: number) {

        return this.userAccountService.findOneAccount(id);
    }

    @Patch(':id')
    @UseGuards(AuthenticatedUserGuard, AuthorizedUserGuard)
    updateAccount(@Param('id', ParseIntPipe) id: number,
        @Body() updateUserAccountDTO: UpdateUserAccountDTO) {

        return this.userAccountService.updateAccount(id, updateUserAccountDTO);
    }

    @Delete(':id')
    @UseGuards(AuthenticatedUserGuard, AuthorizedUserGuard)
    deleteAccount(@Param('id', ParseIntPipe) id: number) {

        return this.userAccountService.deleteAccount(id);
    }
}
