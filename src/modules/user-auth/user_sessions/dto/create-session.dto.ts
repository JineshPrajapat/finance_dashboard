import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateSessionDto {
  @ApiProperty({
    example: 1,
    description: 'User ID',
  })
  @IsInt()
  u_id: number;

  @ApiProperty({
    example: 'long-refresh-token-string',
    description: 'JWT refresh token',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;

  @ApiProperty({
    example: '2026-12-31T23:59:59.000Z',
    description: 'Token expiry timestamp',
  })
  @IsDateString()
  expires_at: Date;
}
