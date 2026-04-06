import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async getAllPermissions() {
    const permissions = await this.permissionsRepository.find();
    if (!permissions || !permissions.length) {
      return {
        code: 401,
        status: 'error',
        message: 'Permissions not found!',
      };
    }

    return {
      code: 200,
      status: 'success',
      data: permissions,
    };
  }

  async getPermissionsById(p_id: number) {
    const permissions = await this.permissionsRepository.find({
      where: { p_id },
    });
    if (!permissions) {
      return {
        code: 401,
        status: 'error',
        message: 'Permissions not found!',
      };
    }

    return {
      code: 200,
      status: 'success',
      data: permissions,
    };
  }
}
