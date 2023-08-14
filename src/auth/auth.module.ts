import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleAsyncOptions } from '@nestjs/jwt';
import { SharedDbModule } from 'src/shared-db/shared-db.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthenticatedUserGuard, AuthorizedUserGuard } from './guards';


@Module({
  imports: [
    SharedDbModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => (configService.get<JwtModuleAsyncOptions>('jwt')),
      inject: [ConfigService],
    }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService,
    AuthenticatedUserGuard,
    AuthorizedUserGuard,
  ],
  exports: [
    AuthService,
    AuthenticatedUserGuard,
    AuthorizedUserGuard,
  ]
})
export class AuthModule { }
