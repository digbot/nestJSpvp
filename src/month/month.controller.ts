import {
  Body,
  Get,
  Delete,
  Controller,
  Post,
  Injectable,
} from '@nestjs/common';
import { CreateMonthDto } from './create-month.dto';
import { MonthService } from './service/month.service';

@Injectable()
@Controller('month')
export class MonthController {
  constructor(private readonly monthService: MonthService) {}

  @Post()
  async create(@Body() createMonthDto: CreateMonthDto) {
    const result = this.monthService.createAsync(createMonthDto);

    return result;
  }

  @Delete()
  async delete() {
    this.monthService.deleteAllAsync();
    return { 'status': 'ok' }
  }
}
