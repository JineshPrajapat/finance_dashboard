import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { RolesModule } from '../roles/roles.module';
// import { PermissionsModule } from '../permissions/permissions.module';
// import { RoleHasPermissionsModule } from '../role-has-permissions/role-has-permissions.module';
import { FinancialRecord } from './entities/financial-record.entity';
import { FinancialRecordsService } from './financial-records.service';
import { FinancialRecordsController } from './financial-records.controller';
import { RoleHasPermissionsModule } from '../role-has-permissions/role-has-permissions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinancialRecord]),
    // RolesModule,
    // PermissionsModule,
    RoleHasPermissionsModule,
  ],
  controllers: [FinancialRecordsController],
  providers: [FinancialRecordsService],
  exports: [FinancialRecordsService],
})
export class FinancialRecordsModule {}
