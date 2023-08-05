import { Controller, Get } from '@nestjs/common';
import { MasterService } from './master.service';

@Controller('master')
export class MasterController {
  constructor(private readonly services: MasterService) {}

  @Get('address')
  async GetAll() {
    return this.services.FindAllAddress();
  }

  @Get('jobtype')
  async GetJobType() {
    return this.services.FindAllJobType();
  }
}
