import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  public bank_id: number;

  @IsNotEmpty()
  public user_id: number;

  @IsNotEmpty()
  @IsNumber()
  public usac_account_number: number;

  @Min(0, {
    message: 'Minimal 0 untuk saldo akun',
  })
  @IsNotEmpty()
  public usac_saldo: number;

  @IsNotEmpty()
  public usac_type: string;

  @IsNotEmpty()
  public usac_status: string;
}
