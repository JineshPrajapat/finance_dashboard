import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
// import { RolesService } from '../roles/roles.service';
// import { RoleHasPermissionsService } from '../role-has-permissions/role-has-permissions.service';
import { FinancialRecord } from './entities/financial-record.entity';
import { CreateFinancialRecordDto } from './dto/create-financial-record.dto';
import { FilterFinancialRecordDto } from './dto/filter-financial-record.dto';
import { UpdateFinancialRecordDto } from './dto/update-financial-record.dto';
import { RoleHasPermissionsService } from '../role-has-permissions/role-has-permissions.service';

@Injectable()
export class FinancialRecordsService {
  constructor(
    @InjectRepository(FinancialRecord)
    private readonly financialRecordRepository: Repository<FinancialRecord>,
    // private readonly rolesService: RolesService,
    private readonly roleHasPermissionsService: RoleHasPermissionsService,
  ) {}

  async createRecord(dto: CreateFinancialRecordDto, currentUser: any) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'records.create',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission.',
        };
      }

      const record = this.financialRecordRepository.create({
        ...dto,
        created_by: currentUser.id,
      });

      await this.financialRecordRepository.save(record);

      return {
        code: 201,
        status: 'success',
        message: 'Record created successfully',
      };
    } catch (err) {
      return {
        code: 500,
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  async getRecords(filter: FilterFinancialRecordDto, currentUser: any) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'records.list',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission.',
        };
      }

      const qb = this.financialRecordRepository.createQueryBuilder('fr');

      if (filter.type) {
        qb.andWhere('fr.type = :type', { type: filter.type });
      }

      if (filter.category) {
        qb.andWhere('fr.category = :category', { category: filter.category });
      }

      if (filter.start_date && filter.end_date) {
        qb.andWhere('fr.date BETWEEN :start AND :end', {
          start: filter.start_date,
          end: filter.end_date,
        });
      }

      qb.orderBy('fr.date', 'DESC');

      const data = await qb.getMany();

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

  async updateRecord(
    id: number,
    dto: UpdateFinancialRecordDto,
    currentUser: any,
  ) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'records.edit',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission.',
        };
      }

      const record = await this.financialRecordRepository.findOne({
        where: { fr_id: id },
      });

      if (!record) {
        return { code: 404, status: 'error', message: 'Record not found' };
      }

      Object.assign(record, dto);
      await this.financialRecordRepository.save(record);

      return {
        code: 200,
        status: 'success',
        message: 'Record updated',
      };
    } catch (err) {
      return {
        code: 500,
        status: 'error',
        message: 'Internal server error',
      };
    }
  }

  async deleteRecord(id: number, currentUser: any) {
    try {
      const hasPermission = await this.roleHasPermissionsService.hasPermission(
        currentUser.role,
        'records.delete',
      );
      if (!hasPermission) {
        return {
          code: 403,
          status: 'error',
          message: 'You do not have permission.',
        };
      }

      const record = await this.financialRecordRepository.findOne({
        where: { fr_id: id },
      });

      if (!record) {
        return { code: 404, status: 'error', message: 'Record not found' };
      }

      await this.financialRecordRepository.remove(record);

      return {
        code: 200,
        status: 'success',
        message: 'Record deleted',
      };
    } catch (err) {
      return {
        code: 500,
        status: 'error',
        message: 'Internal server error',
      };
    }
  }
}
