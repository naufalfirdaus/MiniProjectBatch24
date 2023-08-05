import { IsNumber, IsOptional, MinLength } from 'class-validator';

export class UpdateClientDto {
  @IsOptional()
  @MinLength(2)
  name: string;

  @IsOptional()
  about: string;

  @IsOptional()
  @IsNumber()
  addressId: number;

  @IsOptional()
  @IsNumber()
  empRangeId: number;
}
