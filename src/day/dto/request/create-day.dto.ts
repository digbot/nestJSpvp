import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDayRequestDto {
  @IsString()
  readonly date: string; // Default to current date

  @IsNumber()
  readonly value: number;

  @IsString()
  readonly comment: string;

  @IsString()
  readonly note: string;

  @IsString()
  readonly type: string;

  @IsString()
  readonly hash: string; // New column for storing hash values

  @IsOptional()
  @IsBoolean()
  readonly extra: boolean;
}
