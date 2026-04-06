import { ApiProperty } from '@nestjs/swagger';

class RolePermissionDataDto {
  @ApiProperty({ example: 2, description: 'Role-permission ID' })
  rhp_id: number;

  @ApiProperty({ example: 1, description: 'Permission ID' })
  permission_id: number;

  @ApiProperty({ example: 'user.create', description: 'Permission name' })
  permission_name: string;

  @ApiProperty({ example: 'Add User', description: 'Permission title' })
  permission_title: string;
}

export class GetRolePermissionsResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    type: [RolePermissionDataDto],
    description: 'Role permissions data',
  })
  data: RolePermissionDataDto[];

  @ApiProperty({
    example: 'Role permissions retrieved successfully',
    description: 'Response message',
  })
  message: string;
}
