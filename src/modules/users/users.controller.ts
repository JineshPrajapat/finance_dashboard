import {
  Body,
  Controller,
  Post,
  Req,
  Patch,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RoleHasPermissionsService } from '../role-has-permissions/role-has-permissions.service';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
} from '@nestjs/swagger';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { CreateUserResponseDto } from './dto/response/create-user-response.dto';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { GetAllUsersResponseDto } from './dto/response/get-all-users-response.dto';
import { GetUserDetailResponseDto } from './dto/response/get-user-detail-response.dto';
import { GetMyPermissionsResponseDto } from './dto/response/get-my-permissions-response.dto';
import { UpdateRoleResponseDto } from './dto/response/update-role-response.dto';
import { UpdateStatusResponseDto } from './dto/response/update-status-response.dto';
import { DeleteUserResponseDto } from './dto/response/delete-user-reponse.dto';

@ApiSecurity('app-token')
@ApiBearerAuth('bearer')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rolePermissionService: RoleHasPermissionsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateUserResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  async createUser(@Body() dto: CreateUserDto, @Req() req: any) {
    return this.userService.createUser(dto, req['user']);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get User details' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: GetUserDetailResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: ErrorResponseDto,
  })
  async getUserDetails(@Req() req: Request) {
    return this.userService.getUserById(req['user'].id);
  }

  @Get('me/permissions')
  @ApiOperation({ summary: 'List my permissions' })
  @ApiResponse({
    status: 200,
    description: 'Permission listed',
    type: GetMyPermissionsResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: ErrorResponseDto,
  })
  async getMyPermissions(@Req() req: any) {
    return this.userService.getMyPermissions(req['user'].role);
  }

  @Get('')
  @ApiOperation({ summary: 'List user' })
  @ApiResponse({
    status: 201,
    description: 'Users list retrieved successfully',
    type: GetAllUsersResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  async getAllUsers(@Req() req: Request) {
    return await this.userService.listUsers(req['user']);
  }

  @Patch(':user_id/status')
  @ApiOperation({ summary: 'Update user status' })
  @ApiResponse({
    status: 200,
    description: 'User status updated successfully',
    type: UpdateStatusResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  async updateStatus(
    @Param('user_id') user_id: number,
    @Body() dto: UpdateUserStatusDto,
    @Req() req: Request,
  ) {
    return await this.userService.updateStatus(user_id, dto, req['user']);
  }

  @Patch(':user_id/role')
  @ApiOperation({ summary: 'Update user role' })
  @ApiResponse({
    status: 200,
    description: 'User role updated successfully',
    type: UpdateRoleResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  async updateRole(
    @Param('user_id') user_id: number,
    @Body() dto: UpdateUserRoleDto,
    @Req() req: Request,
  ) {
    return await this.userService.updateUserRole(user_id, dto, req['user']);
  }

  @Get(':user_id')
  @ApiOperation({ summary: 'User details' })
  @ApiResponse({
    status: 200,
    description: 'User details retrieved successfully',
    type: GetUserDetailResponseDto,
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden',
    type: ErrorResponseDto,
  })
  async getUserById(@Param('user_id') user_id: number, @Req() req: Request) {
    return this.userService.getUserById(user_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    type: DeleteUserResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  remove(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
