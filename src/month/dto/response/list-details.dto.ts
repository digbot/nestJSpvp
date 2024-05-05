import { IsInt } from 'class-validator';
import { MonthState } from '../../../typeorm/entities/MonthState';

export class ListDetailsResponseDto {
  @IsInt()
  readonly diff: number;

  @IsInt()
  readonly diffWithoutInvest: number;

  readonly monthState: MonthState;
}
