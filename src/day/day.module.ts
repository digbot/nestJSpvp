/* users.module.ts */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DayState } from 'src/typeorm/entities/DayState';
import { DayController  } from './day.controller';
import { DayService } from './service/day.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [TypeOrmModule.forFeature([DayState])],
  providers: [
    
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    DayService
  ],
  controllers: [DayController],
  exports: [DayService]
})
export class DayModule { }