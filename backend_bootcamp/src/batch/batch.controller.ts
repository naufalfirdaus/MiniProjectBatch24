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

  @Get('paging')
  public async getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return await this.serBatch.findAll({
      page: page,
      limit: limit,
    });
  }

  @Get('search')
  public async search(
    @Query('batch') batch: string,
    @Query('status') status: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return await this.serBatch.findByBatchAndStatus(batch, status, {
      page: page,
      limit: limit,
    });
  }

  @Get('batchid')
  public async getOne(@Query('id') id: number) {
    return this.serBatch.findOne(id);
  }

  @Get('technology')
  public async getTechnology() {
    return this.serBatch.getProgramEntity();
  }

  @Get('instructor')
  public async getInstructor() {
    return this.serBatch.getInstructors();
  }

  @Post('create')
  public async createBatch(@Body() fields: any) {
    return this.serBatch.create(fields);
  }
}
