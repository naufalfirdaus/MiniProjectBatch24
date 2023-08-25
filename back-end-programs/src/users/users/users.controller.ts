import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Query,
  ParseIntPipe,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

// @Controller('users')
@Controller('api')
export class UsersController {
  constructor(private authService: UsersService) {}

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

  // @Get('user-data')
  // public async getUserData(
  //   @Query('userEntityId', ParseIntPipe) userEntityId: number,
  // ) {
  //   return this.authService.getUserData(userEntityId);
  // }

  @Get(':id')
  public async getOne(@Param('id') id: number) {
    const user = await this.authService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // const userEmails = user.usersEmails.map((email) => email.pmailAddress);
    const userEmails = user.usersEmails.map((email) => ({
      id: email.pmailId,
      email: email.pmailAddress,
    }));
    // const userPhoneNumbers = user.usersPhones.map((phone) => phone.uspoNumber);
    const userPhoneNumbers = user.usersPhones.map((phone) => ({
      id: phone.uspoNumber,
      phone: phone.uspoNumber,
      pontycode: phone.uspoPontyCode, //untuk menampilkan data pontycode yang
    }));

    const userAddress = user.usersAddresses.map((address) => ({
      AddressId: address.etadAddrId,
    }));

    const userEducation = user.usersEducations.map((education) => ({
      EducationId: education.usduId,
      School: education.usduSchool,
      Degree: education.usduDegree,
      Study: education.usduFieldStudy,
      Grade: education.usduGrade,
      YearStart: education.usduStartDate,
      YearEnd: education.usduEndDate,
      Activity: education.usduActivities,
      Description: education.usduDescription,
    }));

    return {
      userEntityId: user.userEntityId,
      userName: user.userName,
      userFirstName: user.userFirstName,
      userLastName: user.userLastName,
      userBirthDate: user.userBirthDate,
      userPhoto: user.userPhoto,
      userEmail: userEmails,
      userPhoneNumber: userPhoneNumbers,
      userAddress: userAddress, //untuk menampilkan users address ketika getone
      userEducation: userEducation,
    };
  }
}
