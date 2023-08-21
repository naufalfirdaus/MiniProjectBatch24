import {
  Controller,
  UseGuards,
  Post,
  Request,
  Get,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
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

  @Get('user-data')
  public async getUserDate(
    @Query('userEntityId', ParseIntPipe) userEntityId: number,
  ) {
    return this.authService.getUserData(userEntityId);
  }
}
