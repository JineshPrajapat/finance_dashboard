import { ApiProperty } from '@nestjs/swagger';

class FinancialRecordDto {
  @ApiProperty({ example: 1, description: 'Financial record ID' })
  fr_id: number;

  @ApiProperty({ example: '6000.00', description: 'Amount of the record' })
  amount: string;

  @ApiProperty({ example: 'income', description: 'Type of transaction' })
  type: string;

  @ApiProperty({ example: 'Salary', description: 'Category of transaction' })
  category: string;

  @ApiProperty({ example: '2026-04-06', description: 'Date of transaction' })
  date: string;

  @ApiProperty({
    example: 'Monthly salary credited',
    description: 'Additional notes',
  })
  notes: string;

  @ApiProperty({ example: 2, description: 'User ID who created the record' })
  created_by: number;

  @ApiProperty({
    example: '2026-04-06T05:47:56.472Z',
    description: 'Record creation timestamp',
  })
  created_at: string;

  @ApiProperty({
    example: '2026-04-06T06:09:50.000Z',
    description: 'Record last update timestamp',
  })
  updated_at: string;
}

export class GetAllRecordsResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    type: [FinancialRecordDto],
    description: 'List of financial records',
  })
  data: FinancialRecordDto[];

  @ApiProperty({
    example: 'Records retrieved successfully',
    description: 'Response message',
  })
  message: string;
}
