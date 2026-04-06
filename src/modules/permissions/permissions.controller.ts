import { Controller, Get, Query } from '@nestjs/common';
import { PermissionsService } from './permissions.service';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { GetAllPermissionsResponseDto } from './dto/response/get-all-permission-reponse.dto';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';

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
    type: GetAllPermissionsResponseDto,
  })
  @ApiResponse({
    status: 404,
    description:
      'Permissions not found or something went wrong. Please try again later.',
    type: ErrorResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  async getAllPermissions() {
    return this.permissionsService.getAllPermissions();
  }
}
