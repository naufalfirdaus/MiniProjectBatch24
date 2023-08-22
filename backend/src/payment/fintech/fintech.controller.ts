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
import { FintechService } from './fintech.service';
import { FintechDto } from './dto/fintech.dto';
FintechDto;

@Controller('api/fintech/fintech')
export class FintechController {
  constructor(private Services: FintechService) {}

  @Get('search')
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('name', new DefaultValuePipe(null)) search: string,
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
  public async create(@Body() body: FintechDto) {
    return this.Services.Insert(body);
  }

  @Put('update/:id')
  public async update(
    @Param('id') id: number,
    @Body('fint_code') fint_code: string,
    @Body('fint_name') fint_name: string,
  ) {
    return this.Services.Update(id, fint_code, fint_name);
  }

  @Delete('delete/:id')
  public async delete(@Param('id') id: number) {
    return this.Services.Delete(id);
  }
}
