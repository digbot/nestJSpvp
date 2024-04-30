import {
  Body,
  Get,
  Delete,
  Controller,
  Post,
  Injectable,
} from '@nestjs/common';
import { CreateRequestMonthDto } from '../month/dto/request/create-month.dto';
import { CreateMonthResponseDto } from '../month/dto/response/create-month.dto';
import { MonthService } from './service/month.service';

@Injectable()
@Controller('month')
export class MonthController {
  constructor(private readonly monthService: MonthService) {}

  @Post()
  async create(@Body() createMonthDto: CreateRequestMonthDto) {
    const monthState = await this.monthService.createAsync(createMonthDto);
    const diff = createMonthDto.in - createMonthDto.out;
    const createMonthResponseDto: CreateMonthResponseDto = {
      diff: diff,
      monthState: monthState,
    };

    return createMonthResponseDto;
  }

  @Delete()
  async delete() {
    this.monthService.deleteAllAsync();
    return { 'status': 'ok' }
  }
}
