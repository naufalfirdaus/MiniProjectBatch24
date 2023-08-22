import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { JobCategoryService } from './job-category.service';
import { CreateJobCategoryDto } from './dto/create-jobcategory.dto';
import { UpdateJobCategoryDto } from './dto/update-jobcategory.dto';

@Controller('api/job-category')
export class JobCategoryController {
  constructor(private readonly jobCategoryService: JobCategoryService) {}

  @Post()
  async Create(@Body() createJobCategoryDto: CreateJobCategoryDto) {
    return this.jobCategoryService.Create(createJobCategoryDto);
  }

  @Get()
  async FindAll() {
    return this.jobCategoryService.FindAll();
  }

  @Get(':id')
  async FindOne(@Param('id', ParseIntPipe) id: number) {
    return this.jobCategoryService.FindOne(id);
  }

  @Put(':id')
  async Update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateJobCategoryDto: UpdateJobCategoryDto,
  ) {
    return this.jobCategoryService.Update(id, updateJobCategoryDto);
  }

  @Delete(':id')
  async Delete(@Param('id', ParseIntPipe) id: number) {
    return this.jobCategoryService.Delete(id);
  }
}
