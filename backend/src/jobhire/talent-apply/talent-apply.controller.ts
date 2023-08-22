import { Controller, Get, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { TalentApplyService } from './talent-apply.service';

@Controller('api/talent-apply')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
  }),
)
export class TalentApplyController {
  constructor(private talentApplyService: TalentApplyService) {}

  @Get()
  async GetAll() {
    return this.talentApplyService.FindAll();
  }

  @Get('/user/:userId/job/:jobId')
  async GetOne(@Param('userId') userId: number, @Param('jobId') jobId: number) {
    return this.talentApplyService.FindOne(userId, jobId);
  }
}
