import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { RoleHasPermissionsService } from '../role-has-permissions/role-has-permissions.service';
import { FinancialRecord } from '../financial-records/entities/financial-record.entity';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(FinancialRecord)
    private readonly financialRecordRepository: Repository<FinancialRecord>,
    private readonly roleHasPermissionsService: RoleHasPermissionsService,
  ) {}

  async getSummary(currentUser: any) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'dashboard.view',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission.',
        };
      }

      const result = await this.financialRecordRepository
        .createQueryBuilder('fr')
        .select([
          `SUM(CASE WHEN fr.type = 'income' THEN fr.amount ELSE 0 END) as total_income`,
          `SUM(CASE WHEN fr.type = 'expense' THEN fr.amount ELSE 0 END) as total_expense`,
        ])
        .getRawOne();

      const total_income = Number(result.total_income || 0);
      const total_expense = Number(result.total_expense || 0);

      return {
        code: 200,
        status: 'success',
        data: {
          total_income,
          total_expense,
          net_balance: total_income - total_expense,
        },
      };
    } catch (error) {
      return {
        code: 500,
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  async getCategoryTotals(currentUser: any) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'dashboard.view',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission.',
        };
      }

      const data = await this.financialRecordRepository
        .createQueryBuilder('fr')
        .select('fr.category', 'category')
        .addSelect('SUM(fr.amount)', 'total')
        .groupBy('fr.category')
        .getRawMany();

      return {
        code: 200,
        status: 'success',
        data,
      };
    } catch (err) {
      return {
        code: 500,
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  async getMonthlyTrends(currentUser: any) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'dashboard.view',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission.',
        };
      }

      const data = await this.financialRecordRepository
        .createQueryBuilder('fr')
        .select(`DATE_FORMAT(fr.date, '%Y-%m')`, 'month')
        .addSelect('SUM(fr.amount)', 'total')
        .groupBy(`DATE_FORMAT(fr.date, '%Y-%m')`)
        .orderBy('month', 'ASC')
        .getRawMany();

      return {
        code: 200,
        status: 'success',
        data,
      };
    } catch (err) {
      return {
        code: 500,
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  async getRecentActivity(currentUser: any) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'dashboard.view',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission access recent activity',
        };
      }

      const data = await this.financialRecordRepository.find({
        order: { created_at: 'DESC' },
        take: 10,
      });

      return {
        code: 200,
        status: 'success',
        data,
      };
    } catch (error) {
      return {
        code: 500,
        status: 'error',
        message: 'Internal server error',
      };
    }
  }
}
