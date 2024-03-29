import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from 'config/database.config';
import jwtConfig from 'config/jwt.config';
import { AuthModule } from 'src/auth/auth.module';
import { SharedDbModule } from 'src/shared-db/shared-db.module';
import { UserApiModule } from 'src/user-api/user-api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.get<TypeOrmModuleAsyncOptions>('database'),
      inject: [ConfigService]
    }),
    SharedDbModule,
    AuthModule,
    UserApiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() { }
}
