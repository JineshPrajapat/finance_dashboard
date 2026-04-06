import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RecordType } from '../entities/financial-record.entity';

export class CreateFinancialRecordDto {
  @ApiProperty({
    example: 5000,
    description: 'Amount of the financial record',
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    enum: RecordType,
    example: RecordType.INCOME,
    description: 'Type of record (income or expense)',
  })
  @IsEnum(RecordType)
  type: RecordType;

  @ApiProperty({
    example: 'Salary',
    description: 'Category of the transaction',
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    example: '2026-04-06',
    description: 'Date of the transaction (YYYY-MM-DD)',
  })
  @IsDateString()
  date: Date;

  @ApiPropertyOptional({
    example: 'Monthly salary credited',
    description: 'Optional notes for the record',
  })
  @IsOptional()
  @IsString()
  notes?: string;
}
