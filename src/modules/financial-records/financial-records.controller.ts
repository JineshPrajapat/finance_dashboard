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
  ApiParam,
  ApiSecurity,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { FinancialRecordsService } from './financial-records.service';
import { CreateFinancialRecordDto } from './dto/create-financial-record.dto';
import { UpdateFinancialRecordDto } from './dto/update-financial-record.dto';
import { FilterFinancialRecordDto } from './dto/filter-financial-record.dto';
import { ErrorResponseDto } from 'src/common/dto/error-response.dto';
import { GetAllRecordsResponseDto } from './dto/response/get-all-records-response.dto';
import { UpdateRecordResponseDto } from './dto/response/update-record-response.dto';
import { DeleteRecordResponseDto } from './dto/response/delete-record-response.dto';
import { CreateRecordResponseDto } from './dto/response/create-financial-record-response.dto';

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
    type: CreateRecordResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  async create(@Body() dto: CreateFinancialRecordDto, @Req() req: any) {
    return this.financialRecordsService.createRecord(dto, req['user']);
  }

  @Get()
  @ApiOperation({ summary: 'Get all financial records with filters' })
  @ApiResponse({
    status: 200,
    description: 'Records fetched successfully',
    type: GetAllRecordsResponseDto,
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  async getAllRecords(
    @Query() filter: FilterFinancialRecordDto,
    @Req() req: any,
  ) {
    return this.financialRecordsService.getRecords(filter, req['user']);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a financial record' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Record updated successfully',
    type: UpdateRecordResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFinancialRecordDto,
    @Req() req: any,
  ) {
    return this.financialRecordsService.updateRecord(id, dto, req['user']);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a financial record' })
  @ApiParam({ name: 'id', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'Record deleted successfully',
    type: DeleteRecordResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Record not found',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden - You do not have permission to perform this action',
    type: ErrorResponseDto,
  })
  async delete(@Param('id', ParseIntPipe) id: number, @Req() req: any) {
    return this.financialRecordsService.deleteRecord(id, req['user']);
  }
}
