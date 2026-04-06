import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Role, RoleStatus } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async getUserRole(type: string) {
    const role = await this.roleRepository.findOne({
      where: { type: type, r_id: Not(1) },
    });
    if (!role) {
      return {
        code: 401,
        status: 'error',
        message: 'Roles not found!',
      };
    }

    return {
      code: 200,
      status: 'success',
      data: role,
    };
  }

  async getUserRoleById(roleId: number) {
    const role = await this.roleRepository.findOne({ where: { r_id: roleId } });
    if (!role) {
      return {
        code: 401,
        status: 'error',
        message: 'Roles not found!',
      };
    }

    return {
      code: 200,
      status: 'success',
      data: role,
    };
  }

  async getListOfAllRoles() {
    const roles = await this.roleRepository.find();
    if (!roles || roles.length === 0) {
      return {
        code: 401,
        status: 'error',
        message: 'Roles not found!',
      };
    }

    return {
      code: 200,
      status: 'success',
      data: roles,
      message: 'Roles retrieved successfully',
    };
  }

  async getListofAllEnableRoles() {
    const roles = await this.roleRepository.find({
      where: { status: RoleStatus.Enable },
    });
    if (!roles || roles.length === 0) {
      return {
        code: 401,
        status: 'error',
        message: 'Roles not found!',
      };
    }

    return {
      code: 200,
      status: 'success',
      data: roles,
      message: 'Roles retrieved successfully',
    };
  }

  async updateRoleStatus(roleId: number, status: RoleStatus) {
    const result = await this.roleRepository.update(
      { r_id: roleId },
      { status: status },
    );
    if (result.affected === 0) {
      return {
        code: 404,
        status: 'error',
        message:
          'Role not found or status is already set to the provided value',
      };
    }

    return {
      code: 200,
      status: 'success',
      message: 'Role status updated successfuly',
    };
  }
}
