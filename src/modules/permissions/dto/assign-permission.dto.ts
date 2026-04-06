import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignPermissionDto {
  @ApiProperty()
  @IsInt()
  r_id: number;

  @ApiProperty()
  @IsInt()
  p_id: number;
}
