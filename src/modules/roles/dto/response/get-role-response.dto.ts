import { ApiProperty } from '@nestjs/swagger';

class RoleDataDto {
  @ApiProperty({ example: 2, description: 'Role ID' })
  r_id: number;

  @ApiProperty({ example: 'Admin', description: 'Role name' })
  name: string;

  @ApiProperty({ example: 'admin', description: 'Role type' })
  type: string;

  @ApiProperty({ example: 'Enable', description: 'Role status' })
  status: string;

  @ApiProperty({
    example: '2026-04-04T16:56:41.745Z',
    description: 'Created timestamp',
  })
  created_at: string;

  @ApiProperty({
    example: '2026-04-04T16:56:41.745Z',
    description: 'Updated timestamp',
  })
  updated_at: string;
}

export class GetRolesResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({ type: [RoleDataDto], description: 'Roles data' })
  data: RoleDataDto[];

  @ApiProperty({
    example: 'Roles retrieved successfully',
    description: 'Response message',
  })
  message: string;
}
