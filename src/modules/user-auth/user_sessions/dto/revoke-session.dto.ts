import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class RevokeSessionDto {
  @ApiProperty({
    example: 1,
    description: 'User session ID',
  })
  @IsInt()
  us_id: number;
}
