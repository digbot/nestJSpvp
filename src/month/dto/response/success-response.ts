import { IsInt } from 'class-validator';

export class SuccessResponseDto {
  @IsInt()
  readonly status: string;

  @IsInt()
  readonly data: [];
}
