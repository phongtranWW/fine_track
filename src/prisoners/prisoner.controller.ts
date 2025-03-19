import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PrisonerService } from './prisoner.service';
import { PrisonerDto } from './dtos/prisoner.dto';
import { CreatePrisonerDto } from './dtos/create-prisoner.dto';
import { UpdatePrisonerDto } from './dtos/update-prisoner.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('prisoners')
export class PrisonerController {
  constructor(private readonly prisonerService: PrisonerService) {}

  @Get()
  @ApiQuery({ name: 'page', description: 'Page number', required: true })
  @ApiQuery({ name: 'limit', description: 'Limit number', required: true })
  @ApiQuery({ name: 'name', description: 'Prisoner name', required: false })
  @ApiQuery({
    name: 'dob',
    description: 'Date of Birth',
    required: false,
    format: 'date',
  })
  @ApiQuery({
    name: 'pob',
    description: 'Prisoner name',
    required: false,
    type: 'string',
  })
  async findMany(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('name') name?: string,
    @Query('dob') dob?: Date,
    @Query('pob') pob?: string,
  ): Promise<PrisonerDto[]> {
    return await this.prisonerService.findMany(page, limit, name, dob, pob);
  }

  @Post()
  @ApiBody({
    type: CreatePrisonerDto,
  })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  async create(@Body() createPrisonerDto: CreatePrisonerDto) {
    return await this.prisonerService.create(createPrisonerDto);
  }

  @Put(':prisonerId')
  @ApiParam({
    name: 'prisonerId',
    type: 'number',
    description: 'Prisoner ID',
    required: true,
  })
  @ApiBody({
    type: UpdatePrisonerDto,
  })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 404 })
  async update(
    @Param('prisonerId', ParseIntPipe) prisonerId: number,
    @Body() updatePrisonerDto: UpdatePrisonerDto,
  ) {
    return await this.prisonerService.update(prisonerId, updatePrisonerDto);
  }
}
