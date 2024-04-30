import { IsInt } from 'class-validator';

import { MonthState } from '../../../typeorm/entities/MonthState';

export class CreateMonthResponseDto {
  @IsInt()
  readonly diff: number;

  readonly monthState: MonthState;
}
