import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from '../roles/roles.module';
import { UserService } from './users.service';
import { User } from './entities/user.entity';
import { PermissionsModule } from '../permissions/permissions.module';
import { RoleHasPermissionsModule } from '../role-has-permissions/role-has-permissions.module';
import { UserController } from './users.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RolesModule,
    PermissionsModule,
    RoleHasPermissionsModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
