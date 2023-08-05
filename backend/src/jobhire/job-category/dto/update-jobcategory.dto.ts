import { PartialType } from '@nestjs/mapped-types';
import { CreateJobCategoryDto } from './create-jobcategory.dto';

export class UpdateJobCategoryDto extends PartialType(CreateJobCategoryDto) {}
