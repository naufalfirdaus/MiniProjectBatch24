import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  StreamableFile,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JobhireService } from './jobhire.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateJobPostDto } from './dto/create-jobpost.dto';
import { UpdateJobPostDto } from './dto/update-jobpost.dto';
import { createReadStream } from 'fs';
import { join } from 'path';

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

  @Get('photo/:name')
  @Header('Content-Type', `image/${'png' || 'jpg' || 'jpeg'}`)
  @Header('Content-Disposition', 'attachment')
  getStaticPhoto(@Param('name') name: string): StreamableFile {
    const file = createReadStream(
      join(`${process.cwd()}/uploads/jobphoto/`, name),
    );
    return new StreamableFile(file);
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
  @UseInterceptors(FilesInterceptor('photos'))
  async Update(
    @Param('id') id: number,
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() updateJobPostDto: UpdateJobPostDto,
  ) {
    return this.services.Update(id, updateJobPostDto, photos);
  }

  @Delete(':id')
  async Delete(@Param('id') id: number) {
    return this.services.Delete(id);
  }
}
