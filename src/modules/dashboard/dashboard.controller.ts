import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { GetSummaryResponseDto } from './dto/response/get-summary-response.dto';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { GetCategoryTotalsResponseDto } from './dto/response/get-category-totals-response.dto';
import { GetMonthlyTrendsResponseDto } from './dto/response/get-monthly-trends-response.dto';
import { GetAllRecordsResponseDto } from '../financial-records/dto/response/get-all-records-response.dto';

@ApiTags('Dashboard')
@ApiSecurity('app-token')
@ApiBearerAuth('bearer')
@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('summary')
  @ApiOperation({ summary: 'Get dashboard summary' })
  @ApiResponse({
    status: 200,
    description: 'Summary retrieved successfully',
    type: GetSummaryResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  getSummary(@Req() req: Request) {
    return this.dashboardService.getSummary(req['user']);
  }

  @Get('category-totals')
  @ApiOperation({ summary: 'Get category totals' })
  @ApiResponse({
    status: 200,
    description: 'REtrieved',
    type: GetCategoryTotalsResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  getCategoryTotals(@Req() req: Request) {
    return this.dashboardService.getCategoryTotals(req['user']);
  }

  @Get('monthly-trends')
  @ApiOperation({ summary: 'Get monthly trends' })
  @ApiResponse({
    status: 200,
    description: 'REtrieved',
    type: GetMonthlyTrendsResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  getMonthlyTrends(@Req() req: Request) {
    return this.dashboardService.getMonthlyTrends(req['user']);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent records' })
  @ApiResponse({
    status: 200,
    description: 'REtrieved',
    type: GetAllRecordsResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  getRecentRecords(@Req() req: Request) {
    return this.dashboardService.getRecentActivity(req['user']);
  }
}
