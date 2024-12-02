/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonthModule } from './month/month.module';
import { DayModule } from './day/day.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import typeorm from './config/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env', // Path to the .env file
    load: [typeorm]
  }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const typeOrmOption = configService.get('typeorm');
        typeOrmOption.host = configService.get('DB_HOST');
        typeOrmOption.username = configService.get('DB_USER');
        typeOrmOption.password = configService.get('DB_PASSWORD');
        typeOrmOption.database = configService.get('DB_NAME');
    
        return configService.get('typeorm');
      }
    }),
    DayModule, MonthModule, AuthModule, UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
  exports: [MonthModule, DayModule, ConfigModule]
})
export class AppModule { }