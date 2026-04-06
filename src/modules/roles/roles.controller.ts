import { Controller, Get, Param } from '@nestjs/common';
import { RolesService } from './roles.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetRolesResponseDto } from './dto/response/get-role-response.dto';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';

@Controller('roles')
@ApiSecurity('app-token')
@ApiBearerAuth('bearer')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  // @Get(':type')
  // @ApiOperation({ summary: 'Get a user role' })
  // @ApiResponse({
  //   status: 200,
  //   description: 'User role retrieved successfully.',
  // })
  // @ApiResponse({
  //   status: 401,
  //   description:
  //     'Admin role not found or something went wrong. Please try again later.',
  // })
  // async getUserRole(@Param('type') type: string) {
  //   return this.rolesService.getUserRole(type);
  // }

  @Get('')
  @ApiOperation({ summary: 'Get list of all user roles' })
  @ApiResponse({
    status: 200,
    description: 'User roles retrieved successfully.',
    type: GetRolesResponseDto,
  })
  @ApiResponse({
    status: 404,
    description:
      'User roles not found or something went wrong. Please try again later.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  async getListOFAllEnableAdminRoles() {
    return this.rolesService.getListofAllEnableRoles();
  }
}
