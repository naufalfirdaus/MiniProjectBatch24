import { Controller, Get, DefaultValuePipe, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('/api/bootcamp/dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('summary')
  public async getCountAll() {
    return this.dashboardService.getCount();
  }

  @Get('chart')
  public async getChartAll(
    @Query('year', new DefaultValuePipe(null)) year: number,
  ) {
    return this.dashboardService.getChart(year);
  }
}
