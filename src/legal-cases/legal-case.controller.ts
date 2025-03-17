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
import { CreateLegalCaseDto } from './dtos/create-legal-case.dto';
import { UpdateLegalCaseDto } from './dtos/update-legal-case.dto';
import { AddPaymentDto } from './dtos/add-payment.dto';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('legal-cases')
export class LegalCaseController {
  constructor(private readonly legalCaseService: LegalCaseService) {}

  @Get('remaining-fines')
  @ApiQuery({ name: 'page', description: 'Page number', required: true })
  @ApiQuery({ name: 'limit', description: 'Limit number', required: true })
  async getRemainingFines(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.legalCaseService.getRemainingFine(page, limit);
  }

  @Get('remaining-fines/:prisonerId')
  @ApiQuery({ name: 'page', description: 'Page number', required: true })
  @ApiQuery({ name: 'limit', description: 'Limit number', required: true })
  @ApiParam({ name: 'prisonerId', description: 'Prisoner ID', required: true })
  async getPrisonerRemainingFines(
    @Param('prisonerId', ParseIntPipe) prisonerId: number,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.legalCaseService.getPrisonerRemainingFine(
      page,
      limit,
      prisonerId,
    );
  }

  @Post()
  @ApiQuery({
    name: 'judgementId',
    description: 'Judgement ID',
    required: true,
  })
  @ApiQuery({ name: 'prisonerId', description: 'Prisoner ID', required: true })
  @ApiBody({ type: CreateLegalCaseDto })
  async create(
    @Query('judgementId') judgementId: string,
    @Query('prisonerId', ParseIntPipe) prisonerId: number,
    @Body() createLegalCaseDto: CreateLegalCaseDto,
  ) {
    return await this.legalCaseService.create(
      judgementId,
      prisonerId,
      createLegalCaseDto,
    );
  }

  @Put()
  @ApiQuery({
    name: 'judgementId',
    description: 'Judgement ID',
    required: true,
  })
  @ApiQuery({ name: 'prisonerId', description: 'Prisoner ID', required: true })
  @ApiBody({ type: UpdateLegalCaseDto })
  async update(
    @Query('judgementId') judgementId: string,
    @Query('prisonerId', ParseIntPipe) prisonerId: number,
    @Body() updateLegalCaseDto: UpdateLegalCaseDto,
  ) {
    return await this.legalCaseService.update(
      judgementId,
      prisonerId,
      updateLegalCaseDto,
    );
  }

  @Post('payments')
  @ApiQuery({
    name: 'judgementId',
    description: 'Judgement ID',
    required: true,
  })
  @ApiQuery({ name: 'prisonerId', description: 'Prisoner ID', required: true })
  @ApiBody({ type: AddPaymentDto })
  async addPayment(
    @Query('judgementId') judgementId: string,
    @Query('prisonerId', ParseIntPipe) prisonerId: number,
    @Body() addPaymentDto: AddPaymentDto,
  ) {
    return await this.legalCaseService.addPayment(
      judgementId,
      prisonerId,
      addPaymentDto,
    );
  }

  @Get('payments')
  @ApiQuery({
    name: 'judgementId',
    description: 'Judgement ID',
    required: true,
  })
  @ApiQuery({ name: 'prisonerId', description: 'Prisoner ID', required: true })
  async getPayments(
    @Query('judgementId') judgementId: string,
    @Query('prisonerId', ParseIntPipe) prisonerId: number,
  ) {
    return await this.legalCaseService.getPayments(judgementId, prisonerId);
  }

  @Delete('payments/:paymentId')
  @ApiParam({ name: 'paymentId', description: 'Payment ID', required: true })
  async deletePayment(@Param('paymentId') paymentId: number) {
    return await this.legalCaseService.deletePayment(paymentId);
  }
}
