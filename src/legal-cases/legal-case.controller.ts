import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LegalCaseService } from './legal-case.service';
import { CreateLegalCaseDto } from './dtos/create-legal-case.entity';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UpdateLegalCaseDto } from './dtos/update-legal-case.dto';
import { AddPenaltyDto } from './dtos/add-penalty.dto';
import { UpdatePenaltyDto } from './dtos/update-penalty.dto';
import { LegalCaseDto } from './dtos/legal-case.dto';
import { UpdatePaymentDto } from './dtos/update-payment.dto';
import { AddPaymentDto } from './dtos/add-payment.dto';

@Controller('legal-cases')
export class LegalCaseController {
  constructor(private readonly legalCaseService: LegalCaseService) {}

  @Get()
  @ApiQuery({
    name: 'prisonerId',
    type: 'number',
    description: 'Prisoner ID',
    example: 1,
  })
  @ApiResponse({ status: 200, type: [LegalCaseDto] })
  @ApiResponse({ status: 500 })
  async getLegalCases(@Query('prisonerId', ParseIntPipe) prisonerId: number) {
    return await this.legalCaseService.getLegalCases(prisonerId);
  }

  @Post()
  @ApiBody({ type: CreateLegalCaseDto })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  async create(@Body() dto: CreateLegalCaseDto) {
    return await this.legalCaseService.create(dto);
  }

  @Put(':caseId')
  @ApiParam({
    name: 'caseId',
    type: 'number',
    description: 'Legal Case ID',
  })
  @ApiBody({ type: UpdateLegalCaseDto })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  async update(
    @Param('caseId', ParseIntPipe) caseId: number,
    @Body() dto: UpdateLegalCaseDto,
  ) {
    return await this.legalCaseService.update(caseId, dto);
  }

  @Post(':caseId/penalties')
  @ApiParam({
    name: 'caseId',
    type: 'number',
    description: 'Legal Case ID',
  })
  @ApiBody({ type: AddPenaltyDto })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 400 })
  async addPenalty(
    @Param('caseId', ParseIntPipe) caseId: number,
    @Body() dto: AddPenaltyDto,
  ) {
    return await this.legalCaseService.addPenalty(caseId, dto);
  }

  @Put(':caseId/penalties/:penaltyId')
  @ApiParam({
    name: 'caseId',
    type: 'number',
    description: 'Legal Case ID',
  })
  @ApiParam({
    name: 'penaltyId',
    type: 'number',
    description: 'Penalty ID',
  })
  @ApiBody({ type: UpdatePenaltyDto })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 400 })
  async updatePenalty(
    @Param('caseId', ParseIntPipe) caseId: number,
    @Param('penaltyId', ParseIntPipe) penaltyId: number,
    @Body() dto: UpdatePenaltyDto,
  ) {
    return await this.legalCaseService.updatePenalty(caseId, penaltyId, dto);
  }

  @Delete(':caseId/penalties/:penaltyId')
  @ApiParam({
    name: 'caseId',
    type: 'number',
    description: 'Legal Case ID',
  })
  @ApiParam({
    name: 'penaltyId',
    type: 'number',
    description: 'Penalty ID',
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 500 })
  async deletePenalty(
    @Param('caseId', ParseIntPipe) caseId: number,
    @Param('penaltyId', ParseIntPipe) penaltyId: number,
  ) {
    return await this.legalCaseService.deletePenalty(caseId, penaltyId);
  }

  @Post(':caseId/payments')
  @ApiParam({
    name: 'caseId',
    type: 'number',
    description: 'Legal Case ID',
  })
  @ApiBody({ type: AddPaymentDto })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 400 })
  async addPayment(
    @Param('caseId', ParseIntPipe) caseId: number,
    @Body() dto: AddPaymentDto,
  ) {
    return await this.legalCaseService.addPayment(caseId, dto);
  }

  @Put(':caseId/payments/:paymentId')
  @ApiParam({
    name: 'caseId',
    type: 'number',
    description: 'Legal Case ID',
  })
  @ApiParam({
    name: 'paymentId',
    type: 'number',
    description: 'Payment ID',
  })
  @ApiBody({ type: UpdatePaymentDto })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 400 })
  async updatePayment(
    @Param('caseId', ParseIntPipe) caseId: number,
    @Param('paymentId', ParseIntPipe) paymentId: number,
    @Body() dto: UpdatePaymentDto,
  ) {
    return await this.legalCaseService.updatePayment(caseId, paymentId, dto);
  }

  @Delete(':caseId/payments/:paymentId')
  @ApiParam({
    name: 'caseId',
    type: 'number',
    description: 'Legal Case ID',
  })
  @ApiParam({
    name: 'paymentId',
    type: 'number',
    description: 'Payment ID',
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 500 })
  async deletePayment(
    @Param('caseId', ParseIntPipe) caseId: number,
    @Param('paymentId', ParseIntPipe) paymentId: number,
  ) {
    return await this.legalCaseService.deletePayment(caseId, paymentId);
  }
}
