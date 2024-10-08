import { IsInt } from 'class-validator';

export class ListShortResponseDto {
  readonly byDay: number;

  @IsInt()
  readonly date: string;

  readonly grath: string;

  @IsInt()
  readonly diff: number;

  @IsInt()
  readonly diffWithoutInvest: number;

  @IsInt()
  readonly invest: number;

  @IsInt()
  readonly middleMonthValue: number;

  @IsInt()
  readonly in: number;

  @IsInt()
  readonly out: number;
}
