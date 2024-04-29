import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class MonthService {
  constructor(private dataSource: DataSource) {}
  getHello(): string {
    return 'Hello World!';
  }
}
