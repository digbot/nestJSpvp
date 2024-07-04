import { IsInt, IsString } from 'class-validator';

export class CreateMonthDto {
  @IsString()
  readonly date: Date;

  @IsInt()
  readonly in: number;

  @IsInt()
  readonly out: number;

  @IsInt()
  readonly buffer: number;

  @IsInt()
  readonly invest: number;
}
