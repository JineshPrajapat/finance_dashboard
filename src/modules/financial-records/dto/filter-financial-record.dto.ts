import { IsOptional, IsEnum, IsString, IsDateString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { RecordType } from '../entities/financial-record.entity';

export class FilterFinancialRecordDto {
  @ApiPropertyOptional({
    enum: RecordType,
    example: RecordType.INCOME,
    description: 'Filter by record type',
  })
  @IsOptional()
  @IsEnum(RecordType)
  type?: RecordType;

  @ApiPropertyOptional({
    example: 'Salary',
    description: 'Filter by category',
  })
  @IsOptional()
  @IsString()
  category?: string;

  @ApiPropertyOptional({
    example: '2026-01-01',
    description: 'Start date for filtering (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  start_date?: string;

  @ApiPropertyOptional({
    example: '2026-12-31',
    description: 'End date for filtering (YYYY-MM-DD)',
  })
  @IsOptional()
  @IsDateString()
  end_date?: string;
}
