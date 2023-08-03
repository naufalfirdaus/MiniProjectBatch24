import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  UseGuards,
  Delete,
  Param,
  Put,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api')
export class UsersController {
  constructor(private authService: UsersService) {}

  @Get()
  public async getAll() {
    return this.authService.findAll();
  }

  @Delete('users/:id')
  public async Delete(@Param('id') id: number) {
    return this.authService.delete(id);
  }

  @Post('signup')
  @UseInterceptors(FileInterceptor('fields'))
  public async signUp(@Body() fields: any) {
    return this.authService.signup(fields);
  }

  @Post('signupEmployee')
  @UseInterceptors(FileInterceptor('fields'))
  public async signUpEmployee(@Body() fields: any) {
    return this.authService.signupasemployee(fields);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  public async Update(
    @UploadedFile('file') file,
    @Body() fields: any,
    @Param('id') id: number,
  ) {
    return this.authService.applyupdate(file, id, fields);
  }

  @UseGuards(AuthGuard('local'))
  @Post('signin')
  public async signIn(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  public async getProfile(@Request() req) {
    return req.user;
  }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    return this.authService.findOne(id);
  }

  @Put('users/profile/edit/:id')
  @UseInterceptors(FileInterceptor('file'))
  public async editProfile(
    @UploadedFile('file') file,
    @Param('id') id: number,
    @Body() fields: any,
  ) {
    return this.authService.editprofile(file, id, fields);
  }

  @Put('users/profile/password/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async changePassword(@Param('id') id: number, @Body() fields: any) {
    return this.authService.changepassword(id, fields);
  }

  @Post('users/profile/email/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async addEmail(@Param('id') id: number, @Body() fields: any) {
    return this.authService.addemail(id, fields);
  }

  @Put('users/profile/email/:pmailid')
  @UseInterceptors(FileInterceptor('fields'))
  public async editEmail(
    @Param('pmailid') pmailid: number,
    @Body() fields: any,
  ) {
    return this.authService.editmail(pmailid, fields);
  }

  @Delete('users/profile/email/:pmailid')
  public async Deleteemail(@Param('pmailid') pmailid: number) {
    return this.authService.deleteemail(pmailid);
  }

  @Post('users/profile/phone/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async addPhone(@Param('id') id: number, @Body() fields: any) {
    return this.authService.addphone(id, fields);
  }

  @Put('users/profile/phone/:usponumber')
  @UseInterceptors(FileInterceptor('fields'))
  public async editPhone(
    @Param('usponumber') usponumber: string,
    @Body() fields: any,
  ) {
    return this.authService.editphone(usponumber, fields);
  }

  @Delete('users/profile/phone/:usponumber')
  public async Deletephone(@Param('usponumber') usponumber: string) {
    return this.authService.deletephone(usponumber);
  }

  @Post('users/profile/address/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async addAddress(@Param('id') id: number, @Body() fields: any) {
    return this.authService.addaddress(id, fields);
  }

  @Put('users/profile/address/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async editAddress(@Param('id') id: number, @Body() fields: any) {
    return this.authService.editaddress(id, fields);
  }

  @Delete('users/profile/address/:id')
  public async Deleteaddress(@Param('id') id: number) {
    return this.authService.deleteaddress(id);
  }

  @Post('users/profile/education/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async addEducation(@Param('id') id: number, @Body() fields: any) {
    return this.authService.addeducation(id, fields);
  }

  @Put('users/profile/education/:id')
  @UseInterceptors(FileInterceptor('fields'))
  public async editEducation(@Param('id') id: number, @Body() fields: any) {
    return this.authService.editeducation(id, fields);
  }

  @Delete('users/profile/education/:id')
  public async Deleteeducation(@Param('id') id: number) {
    return this.authService.deleteeducation(id);
  }
}
