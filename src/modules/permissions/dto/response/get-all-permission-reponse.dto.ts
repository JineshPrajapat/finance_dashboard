import { ApiProperty } from '@nestjs/swagger';

class PermissionDataDto {
  @ApiProperty({ example: 1, description: 'Permission ID' })
  p_id: number;

  @ApiProperty({ example: 'user.create', description: 'Permission name' })
  name: string;

  @ApiProperty({ example: 'Add User', description: 'Permission title' })
  title: string;

  @ApiProperty({
    example: '2026-04-05T01:50:04.086Z',
    description: 'Creation timestamp',
  })
  createdAt: string;
}

export class GetAllPermissionsResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    type: [PermissionDataDto],
    description: 'List of permissions',
  })
  data: PermissionDataDto[];

  @ApiProperty({
    example: 'Permissions retrieved successfully',
    description: 'Response message',
  })
  message: string;
}
