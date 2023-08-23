import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Header,
  Param,
  Post,
  Put,
  Query,
  Request,
  StreamableFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JobhireService } from './jobhire.service';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { CreateJobPostDto } from './dto/create-jobpost.dto';
import { UpdateJobPostDto } from './dto/update-jobpost.dto';
import { createReadStream } from 'fs';
import { join } from 'path';
import { CreateTalentApplyDto } from './dto/create-talentapply.dto';
import { JobPhotoMulter } from 'src/multer/jobphoto-multer';
import { TalentApplyService } from './talent-apply/talent-apply.service';
import { UserMediaMulter } from 'src/multer/usermedia-multer';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/jobs')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class JobhireController {
  constructor(
    private services: JobhireService,
    private talentApplyService: TalentApplyService,
  ) {}

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

  @UseGuards(AuthGuard('jwt'))
  @Post('posting/create')
  @UseInterceptors(
    FilesInterceptor('photos', 10, JobPhotoMulter.MulterOption()),
  )
  async Create(
    @Request() req: any,
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() createJobPostDto: CreateJobPostDto,
  ) {
    if (!req.user.roleId.toString().match(/(10|3)$/))
      throw new ForbiddenException();
    return this.services.Create(photos, createJobPostDto, req.user.UserId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('posting/update/:id')
  @UseInterceptors(FilesInterceptor('photos'))
  async Update(
    @Request() req: any,
    @Param('id') id: number,
    @UploadedFiles() photos: Array<Express.Multer.File>,
    @Body() updateJobPostDto: UpdateJobPostDto,
  ) {
    if (!req.user.roleId.toString().match(/(10|3)$/))
      throw new ForbiddenException();

    return this.services.Update(id, updateJobPostDto, photos);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async Delete(@Request() req: any, @Param('id') id: number) {
    if (!req.user.roleId.toString().match(/(10|3)$/))
      throw new ForbiddenException();

    return this.services.Delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('applyProfessional')
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'resume', maxCount: 1 },
        { name: 'photo', maxCount: 1 },
      ],
      UserMediaMulter.MulterOption(),
    ),
  )
  async CreateTalentApply(
    @Request() req: any,
    @Body() taapData: CreateTalentApplyDto,
    @UploadedFiles()
    files: { resume?: Express.Multer.File; photo?: Express.Multer.File },
  ) {
    return this.talentApplyService.Create(
      req.user.UserId,
      taapData,
      files.resume,
      files.photo,
    );
  }
}
