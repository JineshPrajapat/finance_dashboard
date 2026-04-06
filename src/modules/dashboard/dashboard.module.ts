import { Module } from '@nestjs/common';
import { RoleHasPermissionsModule } from '../role-has-permissions/role-has-permissions.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FinancialRecord } from '../financial-records/entities/financial-record.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FinancialRecord]),
    RoleHasPermissionsModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
