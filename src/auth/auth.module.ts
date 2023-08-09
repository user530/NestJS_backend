import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserAccountService } from 'src/users/user-account/user-account.service';
import { JwtModule } from '@nestjs/jwt';
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
      useFactory: (configService: ConfigService) => {
        console.log(configService.get<string>('jwt'))
        return {
          secret: configService.get<string>('jwt.secret'),
          signOptions: {
            expiresIn: configService.get<string>('jwt.expiresIn')
          }
        }
      },

      // ({

      //   secret: configService.get<string>('jwt.secret'),
      //   signOptions: {
      //     expiresIn: configService.get<string>('jwt.expiresIn')
      //   }
      // })
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, UserAccountService],
  controllers: [AuthController]
})
export class AuthModule { }
