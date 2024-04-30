import {
  Body,
  Get,
  Delete,
  Controller,
  Post,
  Injectable,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { CreateRequestMonthDto } from '../month/dto/request/create-month.dto';
import { CreateMonthResponseDto } from '../month/dto/response/create-month.dto';
import { SuccessResponseDto } from '../month/dto/response/success-response';
import { MonthService } from './service/month.service';
import { ListMonthResponseDto } from '../month/dto/response/list-month.dto';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

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

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  async getAll() {
    const res = await this.monthService.getAllAsync();

    return res;
  }

  @Delete()
  async delete() {
    this.monthService.deleteAllAsync();
    return SuccessResponseDto;
  }
}
