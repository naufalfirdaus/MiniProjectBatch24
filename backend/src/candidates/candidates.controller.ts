import { Controller } from '@nestjs/common';
import {
  Get,
  DefaultValuePipe,
  ParseIntPipe,
  Put,
  Query,
  Body,
} from '@nestjs/common';
import { CandidatesService } from './candidates.service';

@Controller('api/bootcamp/candidate')
export class CandidatesController {
  constructor(private Service: CandidatesService) {}

  @Get('filterby')
  public async getByStatusAndDate(
    @Query('status') status: string,
    @Query('month', new DefaultValuePipe(null)) month: number,
    @Query('year', new DefaultValuePipe(null)) year: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
  ) {
    return await this.Service.findByStatusAndDate(status, month, year, {
      page: page,
      limit: limit,
    });
  }

  @Put('switchstatus')
  public async updateStatus(
    @Query('userentity') idusr: number,
    @Body() fields: any,
  ) {
    return await this.Service.switchStatus(idusr, fields);
  }

  @Get('forbootcamp')
  public async getPassedCandidateWithoutBootcamp(
    @Query('program') program: number,
    @Query('month') month: number,
    @Query('year') year: number,
  ) {
    return await this.Service.findPassedCandidateWithoutBootcamp(
      program,
      month,
      year,
    );
  }

  @Get('program')
  public async getCandidateAndBatchTrainee(
    @Query('programId') programId: number,
    @Query('batchId') batchId: number,
  ) {
    return await this.Service.findCandidateAndBatchTrainee(programId, batchId);
  }
}
