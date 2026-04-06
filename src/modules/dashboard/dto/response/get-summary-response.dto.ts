import { ApiProperty } from '@nestjs/swagger';

class SummaryDataDto {
  @ApiProperty({ example: 57000, description: 'Total income' })
  total_income: number;

  @ApiProperty({ example: 0, description: 'Total expense' })
  total_expense: number;

  @ApiProperty({
    example: 57000,
    description: 'Net balance (income - expense)',
  })
  net_balance: number;
}

export class GetSummaryResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({ type: SummaryDataDto, description: 'Summary data' })
  data: SummaryDataDto;

  @ApiProperty({
    example: 'Summary retrieved successfully',
    description: 'Response message',
  })
  message: string;
}
