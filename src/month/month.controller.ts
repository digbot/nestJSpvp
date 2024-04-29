import { Controller, Get } from '@nestjs/common';
import { MonthService } from './month.service';

@Controller()
export class MonthController {
  constructor(private readonly appService: MonthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
