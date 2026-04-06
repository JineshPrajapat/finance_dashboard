import {
  Body,
  Controller,
  Post,
  Req,
  ForbiddenException,
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
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async createUser(@Body() dto: CreateUserDto, @Req() req: any) {
    return this.userService.createUser(dto, req['user']);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get User details' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getUserDetails(@Req() req: Request) {
    return this.userService.getUserById(req['user'].id);
  }

  @Get('me/permissions')
  @ApiOperation({ summary: 'List my permissions' })
  async getMyPermissions(@Req() req: any) {
    return this.userService.getMyPermissions(req['user'].role);
  }

  @Get('')
  @ApiOperation({ summary: 'List user' })
  @ApiResponse({
    status: 201,
    description: 'Users list retrieved successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getAllUsers(@Req() req: Request) {
    return await this.userService.listUsers(req['user']);
  }

  @Patch(':user_id/status')
  @ApiOperation({ summary: 'Update user status' })
  @ApiResponse({ status: 201, description: 'User status updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async updateStatus(
    @Param('user_id') user_id: number,
    @Body() dto: UpdateUserStatusDto,
    @Req() req: Request,
  ) {
    return await this.userService.updateStatus(user_id, dto, req['user']);
  }

  @Patch(':user_id/role')
  @ApiOperation({ summary: 'Update user role' })
  @ApiResponse({ status: 201, description: 'User role updated successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
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
    status: 201,
    description: 'User details retrieved successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  async getUserById(@Param('user_id') user_id: number, @Req() req: Request) {
    return this.userService.getUserById(user_id);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
