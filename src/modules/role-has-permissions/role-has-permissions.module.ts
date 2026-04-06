import { Module } from '@nestjs/common';
import { RoleHasPermissionsController } from './role-has-permissions.controller';
import { RoleHasPermissionsService } from './role-has-permissions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleHasPermissions } from './entities/role-has-permissions.entity';
import { RolesModule } from '../roles/roles.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { UserModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleHasPermissions]),
    PermissionsModule,
    RolesModule,
  ],
  controllers: [RoleHasPermissionsController],
  providers: [RoleHasPermissionsService],
  exports: [RoleHasPermissionsService],
})
export class RoleHasPermissionsModule {}
