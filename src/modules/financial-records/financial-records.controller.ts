import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiParam,
  ApiSecurity,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FinancialRecordsService } from './financial-records.service';
import { CreateFinancialRecordDto } from './dto/create-financial-record.dto';
import { UpdateFinancialRecordDto } from './dto/update-financial-record.dto';
import { FilterFinancialRecordDto } from './dto/filter-financial-record.dto';

@ApiTags('Financial Records')
@ApiSecurity('app-token')
@ApiBearerAuth('bearer')
@Controller('financial-records')
export class FinancialRecordsController {
  constructor(
    private readonly financialRecordsService: FinancialRecordsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a financial record' })
  @ApiResponse({
    status: 201,
    description: 'Record created successfully',
    schema: {
      example: {
        code: 201,
        status: 'success',
        message: 'Record created successfully',
      },
    },
  })
  async create(@Body() dto: CreateFinancialRecordDto, @Req() req: any) {
    return this.financialRecordsService.createRecord(dto, req['user']);
  }

  @Get()
  @ApiOperation({ summary: 'Get all financial records with filters' })
  @ApiResponse({
    status: 200,
    description: 'Records fetched successfully',
  })
  async findAll(@Query() filter: FilterFinancialRecordDto, @Req() req: any) {
    return this.financialRecordsService.getRecords(filter, req['user']);
  }

  // ✅ Update Record
  @Patch(':id')
  @ApiOperation({ summary: 'Update a financial record' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiBody({ type: UpdateFinancialRecordDto })
  @ApiResponse({
    status: 200,
    description: 'Record updated successfully',
    schema: {
      example: {
        code: 200,
        status: 'success',
        message: 'Record updated',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFinancialRecordDto,
    @Req() req: any,
  ) {
    return this.financialRecordsService.updateRecord(id, dto, req['user']);
  }

  // ✅ Delete Record
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a financial record' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Record deleted successfully',
    schema: {
      example: {
        code: 200,
        status: 'success',
        message: 'Record deleted',
      },
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.financialRecordsService.deleteRecord(id, req['user']);
  }
}
