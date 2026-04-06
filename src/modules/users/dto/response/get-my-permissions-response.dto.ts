import { ApiProperty } from '@nestjs/swagger';

class PermissionDataDto {
  @ApiProperty({
    example: null,
    description: 'Role-Has-Permission ID, can be null',
  })
  rhp_id: number | null;

  @ApiProperty({ example: 1, description: 'Permission ID' })
  permission_id: number;

  @ApiProperty({ example: 'user.create', description: 'Permission name' })
  permission_name: string;

  @ApiProperty({ example: 'Add User', description: 'Permission title' })
  permission_title: string;
}

export class GetMyPermissionsResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    type: [PermissionDataDto],
    description: 'List of permissions assigned to user',
  })
  data: PermissionDataDto[];

  @ApiProperty({
    example: 'Permissions retrieved successfully',
    description: 'Response message',
  })
  message: string;
}
