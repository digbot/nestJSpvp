/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonthModule } from './month/month.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';


@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
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
      console.log('typeorm', typeOrmOption);
      return configService.get('typeorm');
    }
  }),  
  MonthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [MonthModule]
})
export class AppModule { }