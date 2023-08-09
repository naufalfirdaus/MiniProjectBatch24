import { PartialType } from '@nestjs/mapped-types';
import { CreateJobPostDto } from './create-jobpost.dto';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateJobPostDto extends PartialType(CreateJobPostDto) {
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  removePhoto: boolean;
  @IsOptional()
  oldPhotoData: string;
}
