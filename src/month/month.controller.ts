import {
  Body,
  Get,
  Patch,
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
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

@Injectable()
@Controller('month')
export class MonthController {
  constructor(private readonly monthService: MonthService) {}

  @Post()
  async create(@Body() createMonthDto: CreateRequestMonthDto) {
    const monthState = await this.monthService.createAsync(createMonthDto);
    const createMonthResponseDto: CreateMonthResponseDto = {
      diff: createMonthDto.in - createMonthDto.out,
      diffWithoutInvest:
        createMonthDto.in - createMonthDto.out - createMonthDto.invest,
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

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/short')
  async getAllShort() {
    const res = await this.monthService.getAllShortAsync();
    return res;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Patch()
  async update() {
    const res = await this.monthService.updateold();
    return res;
  }

/*
  @Delete()
  async delete() {
    this.monthService.deleteAllAsync();
    return SuccessResponseDto;
  }*/
}
