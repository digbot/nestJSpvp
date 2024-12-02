import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateDayResponseDto {
  @IsNumber()
  readonly id: number;

  @IsDate()
  readonly date: Date;

  @IsNumber()
  readonly value: number;

  @IsString()
  readonly comment: string;

  @IsString()
  readonly note: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly hash: string;
}
