import { IsNotEmpty } from 'class-validator';

export class BankDto {
  @IsNotEmpty()
  public bank_code: string;

  @IsNotEmpty()
  public bank_name: string;
}
