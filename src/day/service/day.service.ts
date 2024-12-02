import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DayState } from '../../typeorm/entities/DayState';
import { CreateDayRequestDto } from '../../day/dto/request/create-day.dto';

@Injectable()
export class DayService {
  constructor(
    @InjectRepository(DayState)
    private readonly dayRepository: Repository<DayState>,
  ) {}

  async createAsync(createDayDto: CreateDayRequestDto): Promise<DayState> {
    const [day, month, year] = createDayDto.date.split('.');
    const postDTO = {
      ...createDayDto,
      date: new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
      ).toISOString(),
    };
    const item = await this.dayRepository.findOne({
      where: { hash: createDayDto.hash },
    });

    if (item) {
      console.log('input', {
        ...item, // existing fields
        ...postDTO, // updated fields
      });
      return this.dayRepository.save({
        ...item, // existing fields
        ...postDTO, // updated fields
      });
    } else {
      const newDay = this.dayRepository.create(postDTO);
      console.log('input', postDTO);
      return this.dayRepository.save(newDay);
    }
  }

  private formatToDateString(date): string {
    if (isNaN(date)) {
      throw new Error('Invalid date string');
    }

    // Extract day, month, and year
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getFullYear();

    // Return formatted date as dd.mm.yyyy
    return `${day}.${month}.${year}`;
  }

  mapEntityToDto(dayState: DayState): CreateDayRequestDto {
    const date = dayState.date ? this.formatToDateString(dayState.date) : '';
    const response: CreateDayRequestDto = {
      ...dayState,
      date: date,
      hash: dayState.hash,
    };

    return response;
  }

  async getByMonthAsync(month: number): Promise<Array<CreateDayRequestDto>> {
    const result = await this.dayRepository
      .createQueryBuilder('day')
      .select('day.*')
      .where('MONTH(day.date) = :month', { month })
      .getRawMany();

    return result.map((x) => this.mapEntityToDto(x));
  }

  async deleteAsync(id: number): Promise<null> {
    await this.dayRepository.delete(id);

    return null;
  }
}
