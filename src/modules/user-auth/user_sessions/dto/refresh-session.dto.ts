import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshSessionDto {
  @ApiProperty({
    example: 'long-refresh-token-string',
    description: 'Refresh token used to generate new access token',
  })
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}
