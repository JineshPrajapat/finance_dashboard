import { ApiProperty } from '@nestjs/swagger';

export class RoleHasPermissionResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    example: 'Permission updated.',
    description: 'Response message',
  })
  message: string;
}
