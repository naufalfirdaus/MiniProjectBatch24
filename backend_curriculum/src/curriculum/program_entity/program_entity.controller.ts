import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  Res,
} from '@nestjs/common';
import { ProgramEntityService } from './program_entity.services';
import { FileInterceptor } from '@nestjs/platform-express';
import { PaginationDto } from 'src/curriculum/dto/pagination.dto';

@Controller('curriculum')
export class ProgramEntityController {
  constructor(private Service: ProgramEntityService) {}

  @Get('paging')
  public async getAll(@Query() options: PaginationDto) {
    const room = this.Service.findAll(options);
    return room;
  }

  @Get('search')
  public async search(@Query() options: PaginationDto) {
    const room = this.Service.search(options);
    return room;
  }

  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  public async Create(@UploadedFile() file: any, @Body() fields: any) {
    return this.Service.create(file, fields);
  }

  @Get('view/proentityid/:id')
  public async getOne(@Param('id') id: number) {
    return this.Service.findOne(id);
  }

  @Get('getImage/:imageName')
  public async getImage(@Param('imageName') imageName: any, @Res() res: any) {
    return this.Service.getImage(imageName, res);
  }

  @Put('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async Update(
    @Param('id') id: any,
    @Body() fields?: any,
    @UploadedFile('file') file?: any,
  ) {
    return this.Service.update(file, id, fields);
  }

  @Delete('delete/:id')
  public async Delete(@Param('id') id: number) {
    return this.Service.Delete(id);
  }

  @Get('cat')
  public async getCategory() {
    return this.Service.getAllCategory();
  }

  @Get('instructor')
  public async getInstructor() {
    return this.Service.getAllInstructor();
  }
}
