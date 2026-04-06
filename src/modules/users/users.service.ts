import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { In, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { RoleHasPermissionsService } from '../role-has-permissions/role-has-permissions.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly rolesService: RolesService,
    private readonly roleHasPermissionsService: RoleHasPermissionsService,
  ) {}

  private readonly saltRounds: number = 10;

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return {
        code: 404,
        status: 'error',
        message: 'User not found!',
      };
    }

    return {
      code: 200,
      status: 'success',
      message: 'User found!',
    };
  }

  async createUser(createUserDto: CreateUserDto, currentUser: any) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'create.user',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission to create users',
        };
      }

      const existingUser = await this.getUserByEmail(createUserDto.email);
      if (existingUser.code === 400) {
        return existingUser;
      }

      const roleResponse = await this.rolesService.getUserRole(
        createUserDto.role,
      );
      if (roleResponse.code !== 200 || !roleResponse.data) {
        return roleResponse;
      }

      let hasedPassword: string = await bcrypt.hash(
        createUserDto.password,
        this.saltRounds,
      );

      const { role, password, ...rest } = createUserDto;
      const user = this.userRepository.create({
        ...rest,
        r_id: roleResponse?.data.r_id,
        password: hasedPassword,
        created_by: currentUser.u_id,
      });

      await this.userRepository.save(user);
      return {
        code: 201,
        status: 'success',
        message: 'User created successfully',
        data: {
          u_id: user.u_id,
          email: user.email,
        },
      };
    } catch (err) {
      return {
        code: 500,
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  async getUserById(u_id: number) {
    const user = await this.userRepository.findOne({
      where: { u_id },
      relations: ['role'],
    });
    if (!user) {
      return {
        code: 404,
        status: 'error',
        message: 'User not found',
      };
    }
    return {
      code: 200,
      status: 'success',
      message: 'User found',
      data: {
        user_id: user.u_id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        role_name: user.role?.name,
        role: user.role?.type,
        role_status: user.role?.status,
        user_status: user.status,
      },
    };
  }

  async getMyPermissions(role: string) {
    return this.roleHasPermissionsService.getRolePermissions(role);
  }

  async listUsers(currentUser: any) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'user.list',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission to list users',
        };
      }

      const users = await this.userRepository.find({
        where: [{ is_deleted: false, u_id: Not(In([currentUser.id, 1])) }],
        relations: ['role'],
      });

      const formattedUsers = users.map((user) => ({
        user_id: user.u_id,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        email: user.email,
        role_name: user.role?.name,
        role: user.role?.type,
        role_status: user.role?.status,
        user_status: user.status,
      }));

      return {
        code: 200,
        status: 'success',
        message: 'Users retrieved successfully',
        data: formattedUsers,
      };
    } catch (err) {
      return {
        code: 500,
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  async updateStatus(u_id: number, dto: UpdateUserStatusDto, currentUser: any) {
    const hasPermission = await this.roleHasPermissionsService.hasPermission(
      currentUser.role,
      'user.edit',
    );
    if (!hasPermission) {
      return {
        code: 403,
        status: 'error',
        message: 'You do not have permission to edit user status',
      };
    }

    const user = await this.userRepository.findOne({ where: { u_id } });

    if (!user) throw new NotFoundException('User not found');

    if (user.u_id === currentUser.u_id) {
      return {
        code: 400,
        status: 'error',
        message: 'You cannot change your own status',
      };
    }

    user.status = dto.status;
    await this.userRepository.save(user);

    return {
      code: 200,
      status: 'success',
      message: 'User status updated successfully',
    };
  }

  async updateUserRole(
    user_id: number,
    dto: UpdateUserRoleDto,
    currentUser: any,
  ) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'user.edit',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission to update users role',
        };
      }

      const user = await this.userRepository.findOne({
        where: { u_id: user_id, is_deleted: false },
      });

      if (!user) {
        return {
          code: 404,
          status: 'error',
          message: 'User not found',
        };
      }

      if (user.u_id === currentUser.u_id) {
        return {
          code: 400,
          status: 'error',
          message: 'You cannot change your own role',
        };
      }

      // Validate new role
      const role = await this.rolesService.getUserRole(dto.role);
      if (!role) {
        return {
          code: 404,
          status: 'error',
          message: 'Role not found',
        };
      }

      if (role.data.type === 'owner_admin') {
        return {
          code: 403,
          status: 'error',
          message: 'Cannot assign OWNER_ADMIN role',
        };
      }

      user.r_id = role.data.r_id;
      await this.userRepository.save(user);

      return {
        code: 200,
        status: 'success',
        message: 'User role updated successfully',
      };
    } catch (err) {
      return {
        code: 500,
        status: 'error',
        message: 'Something went wrong',
      };
    }
  }

  async deleteUser(u_id: number) {
    const user = await this.userRepository.findOne({ where: { u_id } });

    if (!user) throw new NotFoundException('User not found');

    user.is_deleted = true;
    await this.userRepository.save(user);

    return {
      code: 200,
      status: 'success',
      message: 'User deleted successfully',
    };
  }
}
