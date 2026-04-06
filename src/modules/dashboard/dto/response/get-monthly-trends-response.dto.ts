import { ApiProperty } from '@nestjs/swagger';

class MonthlyTotalDto {
  @ApiProperty({ example: '2026-04', description: 'Month in YYYY-MM format' })
  month: string;

  @ApiProperty({
    example: '57000.00',
    description: 'Total amount for the month',
  })
  total: string;
}

export class GetMonthlyTrendsResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    type: [MonthlyTotalDto],
    description: 'List of monthly totals',
  })
  data: MonthlyTotalDto[];

  @ApiProperty({
    example: 'Monthly totals retrieved successfully',
    description: 'Response message',
  })
  message: string;
}
