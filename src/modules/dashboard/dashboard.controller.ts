import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Dashboard')
@ApiSecurity('app-token')
@ApiBearerAuth('bearer')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  getSummary(@Req() req: Request) {
    return this.dashboardService.getSummary(req['user']);
  }

  @Get('category-totals')
  getCategoryTotals(@Req() req: Request) {
    return this.dashboardService.getCategoryTotals(req['user']);
  }

  @Get('monthly-trends')
  getMonthlyTrends(@Req() req: Request) {
    return this.dashboardService.getMonthlyTrends(req['user']);
  }

  @Get('recent')
  getRecent(@Req() req: Request) {
    return this.dashboardService.getRecentActivity(req['user']);
  }
}
