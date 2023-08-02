import { Query, Get, Controller } from '@nestjs/common';
import { BatchService } from './batch.service';

@Controller('/api/bootcamp/batch')
export class BatchController {
    constructor(private serBatch : BatchService) {}

    @Get('search')
    public async getAll(
        @Query('batch') batch: string, 
        @Query('status') status: string,
        ){
        return await this.serBatch.findAll(batch, status)
    }
}
