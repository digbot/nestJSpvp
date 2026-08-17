import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

const roundToTwoDecimals = ({ value }: { value: number }) =>
  Math.round(value * 100) / 100;

export class ListShortResponseDto {
  @Transform(roundToTwoDecimals)
  readonly byDay: number;

  @IsInt()
  readonly date: string;

  readonly grath: string;

  @IsInt()
  @Transform(roundToTwoDecimals)
  readonly diff: number;

  @IsInt()
  @Transform(roundToTwoDecimals)
  readonly diffWithoutInvest: number;

  @IsInt()
  @Transform(roundToTwoDecimals)
  readonly invest: number;

  @IsInt()
  @Transform(roundToTwoDecimals)
  readonly middleMonthValue: number;

  @IsInt()
  @Transform(roundToTwoDecimals)
  readonly total_in: number;

  @IsInt()
  @Transform(roundToTwoDecimals)
  readonly in: number;

  @IsInt()
  @Transform(roundToTwoDecimals)
  readonly out: number;

  @IsInt()
  @Transform(roundToTwoDecimals)
  readonly extra_in: number;
}
