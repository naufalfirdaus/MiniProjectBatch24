import {
  Controller,
  Body,
  Delete,
  Get,
  DefaultValuePipe,
  ParseIntPipe,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersAccountService } from './users-account.service';
import { UsersDto } from './dto/users.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/fintech')
export class UsersAccountController {
  constructor(private Services: UsersAccountService) {}

  @Get('accounts/:accNumber')
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Param('accNumber') accNumber: string,
  ) {
    return this.Services.findAll(accNumber, {
      page: page,
      limit: limit,
    });
  }

  @Get('accounts/all')
  public async getSelect() {
    return this.Services.getAll();
  }

  @Post('accounts')
  public async create(@Body() body: UsersDto) {
    return this.Services.Create(body);
  }

  @Put('accounts/:accNumber')
  public async edit(@Param('accNumber') accNumber: string, @Body() body: any) {
    return this.Services.Edit(accNumber, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('account/search')
  public async getOneByAccountId(
    @Query('bankFintech') bankFintech: number,
    @Req() req: any,
  ) {
    return this.Services.findOneByUserIdAndBankFintech(bankFintech, req);
  }
}
