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
} from '@nestjs/common';
import { UsersAccountService } from './users-account.service';
import { UsersDto } from './dto/users.dto';

@Controller('api/fintech')
export class UsersAccountController {
  constructor(private Services: UsersAccountService) {}

  @Get('accounts')
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return this.Services.findAll({
      page: page,
      limit: limit,
    });
  }

  @Get('account/debitSaldo')
  public async getOne(@Param('id') id: number) {
    return this.Services.findOne(id);
  }

  @Post('account/debitSaldo')
  public async create(@Body() body: UsersDto) {
    return this.Services.Create(body);
  }

  @Put('account/debitSaldo/:accNumber')
  public async edit(@Param('accNumber') accNumber: string, @Body() body: any) {
    return this.Services.Edit(accNumber, body);
  }

  @Delete('account/debitSaldo/:accNumber')
  public async delete(@Param('accNumber') accNumber: string) {
    return this.Services.Delete(accNumber);
  }
}
