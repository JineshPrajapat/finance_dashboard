import { ApiProperty } from '@nestjs/swagger';

class UserDataDto {
  @ApiProperty({ example: 5, description: 'User ID' })
  u_id: number;

  @ApiProperty({ example: 'john.doe@example.com', description: 'User email' })
  email: string;
}

export class CreateUserResponseDto {
  @ApiProperty({ example: 201, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({
    example: 'User created successfully',
    description: 'Response message',
  })
  message: string;

  @ApiProperty({ type: UserDataDto })
  data: UserDataDto;
}
