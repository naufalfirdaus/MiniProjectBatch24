import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
  MinLength,
} from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  id: number;

  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsOptional()
  about: string;

  @IsNotEmpty()
  @IsNumber()
  addressId: number;

  @IsNotEmpty()
  @IsNumber()
  empRangeId: number;
}
