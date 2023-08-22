import { IsNotEmpty } from 'class-validator';

export class updateUsersDto {
  @IsNotEmpty()
  public bank_id: number;

  @IsNotEmpty()
  public usac_account_number: number;

  @IsNotEmpty()
  public usac_saldo: number;

  @IsNotEmpty()
  public usac_type: string;

  @IsNotEmpty()
  public usac_start_date: Date;

  @IsNotEmpty()
  public usac_end_date: Date;
}
