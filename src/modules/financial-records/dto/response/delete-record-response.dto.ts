import { ApiProperty } from '@nestjs/swagger';

export class DeleteRecordResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    example: 'Record deleted successfully.',
    description: 'Response message',
  })
  message: string;
}
