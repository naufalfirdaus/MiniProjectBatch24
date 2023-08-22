import { Type } from 'class-transformer';
import { Allow, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTalentApplyDto {
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  jobEntityId: number;

  @Allow()
  fullName: string;

  @Allow()
  birthDate: Date;

  @Allow()
  degree: string;

  @Allow()
  school: string;

  @Allow()
  fieldStudy: string;

  @Allow()
  phone: string;

  @Allow()
  @Type(() => Number)
  usduId: number;

  @Allow()
  oldPhone: string;
}
