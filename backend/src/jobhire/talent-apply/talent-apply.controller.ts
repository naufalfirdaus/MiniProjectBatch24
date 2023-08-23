import {
  Controller,
  Get,
  Param,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TalentApplyService } from './talent-apply.service';
import { AuthGuard } from '@nestjs/passport';

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

  @UseGuards(AuthGuard('jwt'))
  @Get('job/:jobId')
  async GetOne(@Request() req: any, @Param('jobId') jobId: number) {
    return this.talentApplyService.FindOne(req.user.UserId, jobId);
  }
}
