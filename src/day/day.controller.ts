import {
  Body,
  Get,
  Query,
  Delete,
  Controller,
  Post,
  Injectable,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateDayRequestDto } from '../day/dto/request/create-day.dto';
import { CreateDayResponseDto } from '../day/dto/response/create-day.dto';
import { DayService } from './service/day.service';
import { ClassSerializerInterceptor, UseInterceptors, ParseIntPipe } from '@nestjs/common';

@Injectable()
@Controller('day')
export class DayController {
  constructor(private readonly dayService: DayService) {}

  @Post()
  async create(
    @Body() createDayDto: CreateDayRequestDto,
  ): Promise<CreateDayResponseDto> {
    const dayState = await this.dayService.createAsync(createDayDto);
    const dayStateResponse: CreateDayResponseDto = {
      ...dayState,
    };
    return dayStateResponse;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Get('/byMonth')
  async getByMonth(
    @Query('year', new ParseIntPipe({ optional: true })) year?: number,
    @Query('month', new ParseIntPipe({ optional: true })) month?: number,
  ) {
      const now = new Date();

    year ??= now.getFullYear();
    month ??= now.getMonth() + 1;

    return this.dayService.getByMonthAsync(year, month)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete('/byId')
  async delete(@Query('id') id: number) {
    const res = await this.dayService.deleteAsync(id);
    return res;
  }
}
