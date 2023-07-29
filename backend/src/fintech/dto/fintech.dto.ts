import { IsNotEmpty } from 'class-validator';

export class FintechDto {
  @IsNotEmpty()
  public fint_code: string;

  @IsNotEmpty()
  public fint_name: string;
}
