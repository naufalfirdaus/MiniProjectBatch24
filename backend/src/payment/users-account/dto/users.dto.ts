import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Min,
} from 'class-validator';

export class UsersDto {
  @IsNotEmpty()
  public bank_id: number;

  @IsNotEmpty()
  public user_id: number;

  @IsNotEmpty()
  @IsString()
  public usac_account_number: number;

  @IsNotEmpty()
  public usac_saldo: string;

  @IsNotEmpty()
  public usac_type: string;
}
