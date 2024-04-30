import { CreateMonthDto } from 'src/month/create-month.dto';

export class ListMonthResponseDto {
  readonly list = [CreateMonthDto];
}
