import { ApiProperty } from '@nestjs/swagger';

class CategoryTotalDto {
  @ApiProperty({ example: 'Business', description: 'Category name' })
  category: string;

  @ApiProperty({
    example: '50000.00',
    description: 'Total amount for the category',
  })
  total: string;
}

export class GetCategoryTotalsResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    type: [CategoryTotalDto],
    description: 'List of category totals',
  })
  data: CategoryTotalDto[];

  @ApiProperty({
    example: 'Category totals retrieved successfully',
    description: 'Response message',
  })
  message: string;
}
