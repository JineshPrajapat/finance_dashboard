import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { RoleHasPermissionsService } from './role-has-permissions.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UpdateRoleHasPermissionsDto } from './dto/update-role-has-permissions.dto';

@ApiTags('role/permissions')
@ApiSecurity('app-token')
@ApiBearerAuth('bearer')
@Controller('role/permissions')
export class RoleHasPermissionsController {
  constructor(
    private readonly roleHasPermissionsService: RoleHasPermissionsService,
  ) {}

  @Get(':role')
  @ApiOperation({ summary: 'Get a role permissions' })
  @ApiResponse({
    status: 200,
    description: 'Role permissions retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Role permissions not found or something went wrong. Please try again later.',
  })
  async getRolePermissions(@Param('role') role: string) {
    return this.roleHasPermissionsService.getRolePermissions(role);
  }

  @Put('')
  @ApiOperation({ summary: 'Update permission' })
  @ApiResponse({
    status: 200,
    description: 'Permission has been successfully changed.',
  })
  @ApiResponse({
    status: 401,
    description: 'something went wrong. Please try again later.',
  })
  async updateRolePermissions(
    @Body() updateRoleHasPermissionsDto: UpdateRoleHasPermissionsDto,
    @Req() req: Request,
  ) {
    return this.roleHasPermissionsService.updateRolePermissions(
      updateRoleHasPermissionsDto,
      req['user'],
    );
  }

  //   @Get('user/:userId')
  //   @ApiOperation({ summary: 'Get permissions by admin ID' })
  //   @ApiResponse({
  //     status: 200,
  //     description: 'Permissions retrieved successfully.',
  //   })
  //   @ApiResponse({
  //     status: 401,
  //     description:
  //       'Admin not found, permissions not found, or something went wrong. Please try again later.',
  //   })
  //   async getRolePermissionsByUserId(@Param('role') role: string) {
  //     return this.roleHasPermissionsService.getRolePermissions(role);
  //   }
}
