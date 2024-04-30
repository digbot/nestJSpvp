import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonthState } from '../../typeorm/entities/MonthState';
import { CreateMonthDto } from '../create-month.dto';
import { CreateMonthResponseDto } from '../dto/response/create-month.dto';

@Injectable()
export class MonthService {
  constructor(
    @InjectRepository(MonthState)
    private readonly monthRepository: Repository<MonthState>,
  ) {}

  async createAsync(createMonthDto: CreateMonthDto): Promise<MonthState> {
    console.log(createMonthDto);
    const date = createMonthDto.date;
    const item = await this.monthRepository.findOne({
      where: { date: new Date(date) },
    });
    if (item) {
      return this.monthRepository.save({
        ...item, // existing fields
        ...createMonthDto, // updated fields
      });
    } else {
      const newMonth = this.monthRepository.create(createMonthDto);
      return this.monthRepository.save(newMonth);
    }
  }

  deleteAllAsync() {
    this.monthRepository.clear();
  }

  async getAllAsync(): Promise<Array<CreateMonthResponseDto>> {
    const list: MonthState[] = await this.monthRepository.find({});
    return list.map((x) => this.mapEntityToDto(x));
  }

  private mapEntityToDto(monthState: MonthState): CreateMonthResponseDto {
    return {
      monthState: monthState,
      diff: monthState.in - monthState.out,
    };
  }
}
