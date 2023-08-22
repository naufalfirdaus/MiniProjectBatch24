import { Controller, Get } from '@nestjs/common';
import { MasterService } from './master.service';

@Controller('api/master')
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

  @Get('industry')
  async GetAllIndustry() {
    return this.services.FindAllIndustry();
  }

  @Get('education')
  async GetAllEducation() {
    return this.services.FindAllEducation();
  }
}
