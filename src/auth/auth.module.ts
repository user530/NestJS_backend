import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserAccountService } from 'src/users/user-account/user-account.service';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserAccountModule } from 'src/users/user-account/user-account.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAccount } from 'src/users/user-account/user-account.entity';

@Module({
  imports: [
    UserAccountModule,
    TypeOrmModule.forFeature([UserAccount]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (configService.get<JwtModuleAsyncOptions>('jwt')),
      inject: [ConfigService],
    })
  ],
  providers: [AuthService, UserAccountService],
  controllers: [AuthController]
})
export class AuthModule { }
