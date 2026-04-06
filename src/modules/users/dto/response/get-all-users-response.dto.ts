import { ApiProperty } from '@nestjs/swagger';

export class UserDetailDto {
  @ApiProperty({ example: 2, description: 'User ID' })
  user_id: number;

  @ApiProperty({ example: 'John', description: 'First name' })
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name' })
  last_name: string;

  @ApiProperty({ example: '+1234567890', description: 'Phone number' })
  phone: string;

  @ApiProperty({ example: 'admin@gmail.com', description: 'User email' })
  email: string;

  @ApiProperty({ example: 'Admin', description: 'Role name' })
  role_name: string;

  @ApiProperty({ example: 'admin', description: 'Role type' })
  role: string;

  @ApiProperty({ example: 'Enable', description: 'Role status' })
  role_status: string;

  @ApiProperty({ example: 'Active', description: 'User status' })
  user_status: string;
}

export class GetAllUsersResponseDto {
  @ApiProperty({ example: 200, description: 'HTTP status code' })
  code: number;

  @ApiProperty({ example: 'success', description: 'Response status' })
  status: string;

  @ApiProperty({ type: [UserDetailDto], description: 'List of users' })
  data: UserDetailDto[];

  @ApiProperty({
    example: 'Users retrieved successfully',
    description: 'Response message',
  })
  message: string;
}
