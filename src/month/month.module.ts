/* users.module.ts */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthState } from 'src/typeorm/entities/MonthState';
import { MonthController  } from './month.controller';
import { MonthService } from './service/month.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([MonthState])],
  providers: [
    
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    MonthService
  ],
  controllers: [MonthController],
  exports: [MonthService]
})
export class MonthModule { }