import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoleHasPermissionsDto {
  @ApiProperty({
    example: 1,
    description: 'Permission id',
  })
  @IsNumber()
  p_id: number;

  @ApiProperty({
    example: false,
    description: 'Permission status',
  })
  @IsBoolean()
  permission: boolean;

  @ApiProperty({
    example: 'owner_admin',
    description: 'Role type',
    enum: ['owner_admin', 'admin', 'viewr'],
  })
  @IsString()
  role: string;
}
