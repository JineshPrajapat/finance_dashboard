import { Controller, Get, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('permissions')
@ApiSecurity('app-token')
@ApiBearerAuth('bearer')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get all permissions' })
  @ApiResponse({
    status: 200,
    description: 'Permissions retrieved successfully.',
  })
  @ApiResponse({
    status: 401,
    description:
      'Permissions not found or something went wrong. Please try again later.',
  })
  async getAllPermissions() {
    return this.permissionsService.getAllPermissions();
  }
}
