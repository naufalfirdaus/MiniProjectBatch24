import {
  Query,
  Get,
  Controller,
  DefaultValuePipe,
  ParseIntPipe,
  Post,
  Body,
} from '@nestjs/common';
import { BatchService } from './batch.service';

@Controller('/api/bootcamp/batch')
export class BatchController {
  constructor(private serBatch: BatchService) {}

  @Get('search')
  public async getAll(
    @Query('batch') batch: string,
    @Query('status') status: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return await this.serBatch.findAll(batch, status, {
      page: page,
      limit: limit,
    });
  }

  @Get('batchid')
  public async getOne(@Query('id') id: number) {
    return this.serBatch.findOne(id);
  }

  @Post()
  public async createBatch(@Body() fields: any) {
    return this.serBatch.create(fields);
  }
}
