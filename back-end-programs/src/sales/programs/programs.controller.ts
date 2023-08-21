import {
  Controller,
  Body,
  Param,
  Get,
  Post,
  Put,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  DefaultValuePipe,
  StreamableFile,
  Header,
} from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { UsersDto } from './dto/programs-users.dto';
import { UsersEducationDto } from './dto/programs-users-education.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('programs')
export class ProgramsController {
  constructor(private Services: ProgramsService) {}

  @Post('prog-entity')
  public async applyBootcamp(
    @Query('userEntityId', ParseIntPipe) userEntityId: number,
    @Query('progEntityId', ParseIntPipe) progEntityId: number,
  ) {
    return this.Services.applyBootcamp(userEntityId, progEntityId);
  }

  @Get()
  public async getProgram(
    @Query('orderBy', new DefaultValuePipe('Popular')) orderBy: string,
  ) {
    return this.Services.findAll(orderBy);
  }

  @Get('search')
  public async getSearch(
    @Query('orderBy', new DefaultValuePipe('Popular')) orderBy: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('search', new DefaultValuePipe(null)) search: string,
  ) {
    return this.Services.findSearch(orderBy, search, {
      page: page,
      limit: limit,
    });
  }

  @Get('view')
  public async viewDetail(
    @Query('progEntityId', ParseIntPipe) progEntityId: number,
  ) {
    return this.Services.viewDetail(progEntityId);
  }

  @Post('apply-regular')
  @UseInterceptors(FileInterceptor('file'))
  public async updateUsers(
    @Query('userEntityId', ParseIntPipe) userEntityId: number,
    @Query('progEntityId', ParseIntPipe) progEntityId: number,
    @Body() user: UsersDto,
    @Body() education: UsersEducationDto,
    @UploadedFile() file: any,
  ) {
    return this.Services.updateUsers(
      userEntityId,
      progEntityId,
      user,
      education,
      file,
    );
  }

  @Post('apply-regular/upload-photo')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadPhoto(
    @Query('userEntityId', ParseIntPipe) userEntityId: number,
    @UploadedFile() image: any,
  ) {
    return this.Services.uploadUserPhoto(userEntityId, image);
  }

  @Get('apply-progress')
  public async getProgress(
    @Query('userEntityId') userEntityId: number,
    @Query('progEntityId') progEntityId: number,
  ) {
    return this.Services.getProgress(userEntityId, progEntityId);
  }

  @Get('dashboard')
  public async getDashboard(
    @Query('userEntityId', ParseIntPipe) userEntityId: number,
  ) {
    return this.Services.getDashboard(userEntityId);
  }

  @Get('image/:name')
  @Header('Content-Type', `image/${'png' || 'jpg' || 'jpeg'}`)
  @Header('Content-Disposition', 'attachment')
  getStaticFile(@Param('name') name: string): StreamableFile {
    const file = createReadStream(join(`${process.cwd()}/uploads/`, name));
    return new StreamableFile(file);
  }
}
