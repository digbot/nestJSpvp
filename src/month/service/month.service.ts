import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MonthState } from '../../typeorm/entities/MonthState';
import { CreateMonthDto } from '../create-month.dto';
import { ListDetailsResponseDto } from '../dto/response/list-details.dto';
import { ListShortResponseDto } from '../dto/response/list-short.dto';
import { promises as fs } from 'fs';
// Define the type for the items array
type Item = [number, number, string, number, number];

// Define the type for the whole JSON structure
interface Data {
  items: Item[];
}

@Injectable()
export class MonthService {
  constructor(
    @InjectRepository(MonthState)
    private readonly monthRepository: Repository<MonthState>,
  ) {}

  async createAsync(createMonthDto: CreateMonthDto): Promise<MonthState> {
    const date = new Date(createMonthDto.date);
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

  async getAllShortAsync(): Promise<Array<ListShortResponseDto>> {
    const list: MonthState[] = await this.monthRepository.find({
      order: {
        date: 'DESC',
      },
    });
    return list.map((x) => this.mapShortToDto(x));
  }

  async getAllAsync(): Promise<Array<ListDetailsResponseDto>> {
    const list: MonthState[] = await this.monthRepository.find({
      order: {
        date: 'DESC',
      },
    });
    return list.map((x) => this.mapEntityToDto(x));
  }

  private mapShortToDto(monthState: MonthState): ListShortResponseDto {
    const diffWithoutInvest = Math.abs(
      monthState.in - monthState.out - monthState.invest,
    );
    return {
      byDay: diffWithoutInvest / 30,
      grath:
        monthState.out -
        monthState.invest +
        ': ' +
        this.printChart((monthState.out - monthState.invest) / 100),
      date: this.getDate(monthState),
      diff: monthState.in - monthState.out,
      diffWithoutInvest: diffWithoutInvest,
      invest: monthState.invest,
    };
  }

  private getDate(monthState: MonthState) {
    const year = monthState.date.getFullYear();
    return year + ' ' + this.getMonthAbbreviation(monthState.date);
  }

  private mapEntityToDto(monthState: MonthState): ListDetailsResponseDto {
    return {
      monthState: monthState,
      diff: monthState.in - monthState.out,
      diffWithoutInvest: monthState.out - monthState.invest,
    };
  }

  private getMonthAbbreviation(date: Date): string {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthIndex = date.getMonth();
    return monthNames[monthIndex];
  }

  private printChart(value: number): string {
    if (value < 0 || value > 100) {
      return '';
    }

    const numStars = Math.round((value / 100) * 100); // Scale the value to fit in a 20-character chart
    return '*'.repeat(numStars);
  }

  private getCurrentMonthDateString(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Adding 1 because getMonth() returns zero-based month index
    const day = currentDate.getDate();

    // Ensure leading zero for single-digit days and months
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;

    return `${formattedDay}.${formattedMonth}.${year}`;
  }

  private async readFileSync(filePath: string): Promise<any> {
    try {
      const data = fs.readFile(filePath, 'utf-8');
      console.log(data);
      return data;
    } catch (err) {
      console.error('Error reading file:', err);
    }
  }

  public async updateold() {
    const jsonData = await this.readFileSync('./data/items.json');
    const data: Data = JSON.parse(jsonData);
    data.items.forEach((item) => {
      // Destructure the array for clarity
      const [id, out, date, buffer, invest] = item;

      const newMonth = this.monthRepository.create({
        in: id,
        out: out,
        date: new Date(date),
        buffer: buffer,
        invest: invest,
      });
      this.monthRepository.save(newMonth);
  
    });
  }
}
