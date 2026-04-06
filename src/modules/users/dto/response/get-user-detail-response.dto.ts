import { ApiProperty } from '@nestjs/swagger';
import { UserDetailDto } from './get-all-users-response.dto';

export class GetUserDetailResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({ type: [UserDetailDto], description: 'List of users' })
  data: UserDetailDto;
}
