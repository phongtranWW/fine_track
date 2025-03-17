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
import { PrisonerService } from './prisoner.service';
import { PrisonerDto } from './dtos/prisoner.dto';
import { CreatePrisonerDto } from './dtos/create-prisoner.dto';
import { UpdatePrisonerDto } from './dtos/update-prisoner.dto';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('prisoners')
export class PrisonerController {
  constructor(private readonly prisonerService: PrisonerService) {}

  @Get()
  @ApiQuery({ name: 'page', description: 'Page number', required: true })
  @ApiQuery({ name: 'limit', description: 'Limit number', required: true })
  @ApiQuery({ name: 'name', description: 'Prisoner name', required: false })
  async findMany(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('name') name?: string,
  ): Promise<PrisonerDto[]> {
    return await this.prisonerService.findMany(page, limit, name);
  }

  @Post()
  @ApiBody({
    type: CreatePrisonerDto,
  })
  async create(@Body() createPrisonerDto: CreatePrisonerDto) {
    return await this.prisonerService.create(createPrisonerDto);
  }

  @Put(':prisonerId')
  @ApiParam({
    name: 'prisonerId',
    type: 'number',
    description: 'Prisoner id',
    required: true,
  })
  @ApiBody({
    type: UpdatePrisonerDto,
  })
  async update(
    @Param('prisonerId', ParseIntPipe) prisonerId: number,
    @Body() updatePrisonerDto: UpdatePrisonerDto,
  ) {
    return await this.prisonerService.update(prisonerId, updatePrisonerDto);
  }

  @Delete(':prisonerId')
  @ApiParam({
    name: 'prisonerId',
    type: 'number',
    description: 'Prisoner id',
    required: true,
  })
  async delete(@Param('prisonerId', ParseIntPipe) prisonerId: number) {
    return await this.prisonerService.delete(prisonerId);
  }
}
