import { Get, Controller } from '@nestjs/common';
import { BatchService } from './batch.service';

@Controller('batch')
export class BatchController {
  constructor(private Services: BatchService) {}

  @Get()
  public async getAll() {
    return this.Services.findAll();
  }
}
