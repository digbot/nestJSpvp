import { IsInt } from 'class-validator';

export class ListShortResponseDto {
  @IsInt()
  readonly date: string;

  readonly grath: string;

  @IsInt()
  readonly diff: number;

  @IsInt()
  readonly diffWithoutInvest: number;

  @IsInt()
  readonly invest: number;
}
