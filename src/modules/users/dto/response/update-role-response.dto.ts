import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    example: 'User role updated successfully.',
    description: 'Response message',
  })
  message: string;
}
