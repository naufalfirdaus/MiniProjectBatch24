import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  MinLength,
  IsEnum,
  IsString,
  Length,
} from 'class-validator';
export class CreateJobPostDto {
  @IsNotEmpty()
  @IsString()
  @Length(15, 25)
  jopo_number: string;

  @IsNotEmpty()
  @MinLength(2, {
    message: 'title is too short',
  })
  title: string;

  @IsOptional()
  start_date: Date;

  @IsOptional()
  end_date: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_sal: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_sal: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  min_exp: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  max_exp: number;

  @IsOptional()
  primary_skill: string;

  @IsOptional()
  secondary_skill: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  clit_id: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  joro_id: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  joty_id: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  joca_id: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  addr_id: number;

  @IsOptional()
  work_code: string;

  @IsOptional()
  edu_code: string;

  @IsOptional()
  indu_code: string;

  @IsEnum(['Publish', 'Draft', 'Cancelled', 'Remove'], {
    message:
      'status must be one of the following value: Publish, Draft, Cancelled, Remove',
  })
  status: 'Publish' | 'Draft' | 'Cancelled' | 'Remove' = 'Draft';

  @IsOptional()
  des: JSON;

  @IsOptional()
  resp: JSON;

  @IsOptional()
  target: JSON;

  @IsOptional()
  benefit: JSON;
}
