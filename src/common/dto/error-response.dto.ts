import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ example: 400, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'error', description: 'Response status' })
  status: string;

  @ApiProperty({ example: 'Error message', description: 'Error message' })
  message: string;

  @ApiProperty({
    example: null,
    description: 'Optional error details',
    nullable: true,
  })
  error?: any;
}
