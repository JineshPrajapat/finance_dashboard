import { Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { RoleHasPermissions } from './entities/role-has-permissions.entity';
import { PermissionsService } from '../permissions/permissions.service';
import { UserService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import { UpdateRoleHasPermissionsDto } from './dto/update-role-has-permissions.dto';

@Injectable()
export class RoleHasPermissionsService {
  constructor(
    @InjectRepository(RoleHasPermissions)
    private roleHasPermissionsRepository: Repository<RoleHasPermissions>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private permissionsService: PermissionsService,
    private rolesService: RolesService,
  ) {}

  async getRolePermissions(role: string) {
    if (role === 'owner_admin') {
      const allPermissions = await this.permissionsService.getAllPermissions();
      if (allPermissions.code !== 200) {
        return allPermissions;
      }

      const formattedPermission = allPermissions.data.map((permission) => ({
        rhp_id: null,
        permission_id: permission.p_id,
        permission_name: permission.name,
        permission_title: permission.title,
      }));

      return {
        code: 200,
        status: 'success',
        data: formattedPermission,
      };
    }

    const rolePermissions = await this.entityManager
      .createQueryBuilder(RoleHasPermissions, 'role_has_permissions')
      .innerJoin('role_has_permissions.role', 'role')
      .innerJoin('role_has_permissions.permission', 'permission')
      .where('role.type = :role', { role })
      .select([
        'role_has_permissions.rhp_id AS rhp_id',
        'permission.p_id AS permission_id',
        'permission.name AS permission_name',
        'permission.title AS permission_title',
      ])
      .getRawMany();

    if (!rolePermissions.length) {
      return {
        code: 404,
        status: 'error',
        message: 'No permissions assigned to this role',
      };
    }

    return {
      code: 200,
      status: 'success',
      data: rolePermissions,
    };
  }

  async updateRolePermissions(
    updateRoleHasPermissionsDto: UpdateRoleHasPermissionsDto,
    currentUser: any,
  ) {
    try {
      if (!currentUser || currentUser.role !== 'owner_admin') {
        return {
          code: 403,
          status: 'error',
          message: 'Only OWNER_ADMIN can assign permissions',
        };
      }

      const role = await this.rolesService.getUserRole(
        updateRoleHasPermissionsDto.role,
      );

      if (role.code !== 200) {
        return role;
      }

      const permission = await this.permissionsService.getPermissionsById(
        updateRoleHasPermissionsDto.p_id,
      );
      if (permission.code !== 200) {
        return permission;
      }

      const r_id = role.data.r_id;

      if (updateRoleHasPermissionsDto.permission === false) {
        await this.roleHasPermissionsRepository.delete({
          p_id: updateRoleHasPermissionsDto.p_id,
          r_id: r_id,
        });
      } else {
        const exists = await this.roleHasPermissionsRepository.findOne({
          where: {
            r_id,
            p_id: updateRoleHasPermissionsDto.p_id,
          },
        });

        if (!exists) {
          const rolePermission = this.roleHasPermissionsRepository.create({
            p_id: updateRoleHasPermissionsDto.p_id,
            r_id: r_id,
          });

          await this.roleHasPermissionsRepository.save(rolePermission);
        }
      }

      return {
        code: 200,
        status: 'success',
        message: 'Permission updated.',
      };
    } catch (err) {
      return {
        code: 401,
        status: 'error',
        message: 'Something went wrong. Please try again later.',
      };
    }
  }

  async hasPermission(role: string, permissionName: string): Promise<boolean> {
    if (role === 'owner_admin') return true;

    const permissions = await this.getRolePermissions(role);

    if (permissions.code !== 200) return false;

    return permissions.data.some((p) => p.permission_name === permissionName);
  }
}
