import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JobhireService } from './jobhire.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateJobPostDto } from './dto/create-jobpost.dto';
import { UpdateJobPostDto } from './dto/update-jobpost.dto';

@Controller('jobs')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class JobhireController {
  constructor(private services: JobhireService) {}

  @Get()
  async GetAll() {
    return this.services.FindAll();
  }

  @Get('posting/view')
  async GetForUpdate(@Query('jopoentityid') jopoentityid: number) {
    return this.services.FindOne(jopoentityid);
  }

  @Get('generate/jopoNumber')
  async GenerateJopoNumber() {
    return this.services.GenerateJopoNumber();
  }

  @Get(':id')
  async GetOne(@Param('id') id: number) {
    return this.services.FindOne(id);
  }

  @Post('posting/create')
  @UseInterceptors(FilesInterceptor('photos'))
  async Create(
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() createJobPostDto: CreateJobPostDto,
  ) {
    return this.services.Create(photos, createJobPostDto);
  }

  @Put('posting/update/:id')
  async Update(
    @Param('id') id: number,
    @Body() updateJobPostDto: UpdateJobPostDto,
  ) {
    return this.services.Update(id, updateJobPostDto);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number) {
    return this.services.Delete(id);
  }
}
