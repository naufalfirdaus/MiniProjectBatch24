import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateJobCategoryDto {
  @IsNotEmpty()
  @MinLength(2, {
    message: 'Name is too short',
  })
  name: string;
}
