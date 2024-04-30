/* users.module.ts */
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonthState } from 'src/typeorm/entities/MonthState';
import { MonthController  } from './month.controller';
import { MonthService } from './service/month.service';

@Module({
  imports: [TypeOrmModule.forFeature([MonthState])],
  providers: [MonthService],
  controllers: [MonthController],
  exports: [MonthService]
})
export class MonthModule { }