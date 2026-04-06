import { ApiProperty } from '@nestjs/swagger';

export class UpdateStatusResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    example: 'User status updated successfully.',
    description: 'Response message',
  })
  message: string;
}
