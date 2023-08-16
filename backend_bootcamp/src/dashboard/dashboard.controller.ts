import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('/api/bootcamp/dashboard')
export class DashboardController {
    constructor(private dashboardService: DashboardService) {}

    @Get('summary')
    public async getCountAll(){
        return this.dashboardService.getCount();
    }
}
