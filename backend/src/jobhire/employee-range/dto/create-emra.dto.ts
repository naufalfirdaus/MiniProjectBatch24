import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateEmraDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  min: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  max: number;
}
