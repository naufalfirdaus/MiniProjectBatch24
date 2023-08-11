import { Controller, Get } from '@nestjs/common';
import { TalentApplyService } from './talent-apply.service';

@Controller('talent-apply')
export class TalentApplyController {
  constructor(private talentApplyService: TalentApplyService) {}

  @Get()
  async GetAll() {
    return this.talentApplyService.FindAll();
  }
}
