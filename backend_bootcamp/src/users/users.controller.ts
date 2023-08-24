import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class UsersController {
  constructor(private authService: UsersService) {}

  @UseGuards(AuthGuard('local'))
  @Post('signinemployee')
  public async signInEmployee(@Request() req) {
    return this.authService.login(req.user);
  }
}
