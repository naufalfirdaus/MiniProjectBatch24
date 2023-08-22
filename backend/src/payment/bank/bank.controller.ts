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
import { BankService } from './bank.service';
import { BankDto } from './dto/bank.dto';
BankDto;

@Controller('api/fintech/bank')
export class BankController {
  constructor(private Services: BankService) {}

  @Get('search')
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('name', new DefaultValuePipe(null)) search: string
  ) {
    return this.Services.findAll(search, {
      page: page,
      limit: limit,
    });
  }

  @Get('all')
  public async getForSelect() {
    return this.Services.getAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number) {
    return this.Services.findOne(id);
  }

  @Post('create')
  public async create(@Body() body: BankDto) {
    return this.Services.Insert(body);
  }

  @Put('update/:id')
  public async update(
    @Param('id') id: number,
    @Body('bank_code') bank_code: string,
    @Body('bank_name') bank_name: string
  ) {
    return this.Services.Update(id, bank_code, bank_name);
  }

  @Delete('delete/:id')
  public async delete(@Param('id') id: number) {
    return this.Services.Delete(id);
  }
}
