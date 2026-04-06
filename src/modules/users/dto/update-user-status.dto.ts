import { IsEnum } from 'class-validator';
import { UserStatus } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserStatusDto {
  @ApiProperty({
    example: 'Active',
    enum: UserStatus,
    description: 'Status of the user (Active/Inactive)',
    required: false,
  })
  @IsEnum(UserStatus)
  status: UserStatus;
}
