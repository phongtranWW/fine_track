import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PenaltyTypeService } from './penalty-type.service';
import { ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { PenaltyTypeDto } from './dtos/penalty-type.dto';
import { CreatePenaltyTypeDto } from './dtos/create-penalty-type.dto';
import { UpdatePenaltyTypeDto } from './dtos/update-penalty-type.dto';

@Controller('penalty-types')
export class PenaltyTypeController {
  constructor(private readonly penaltyTypeService: PenaltyTypeService) {}

  @Get()
  @ApiResponse({ status: 200, type: [PenaltyTypeDto] })
  @ApiResponse({ status: 500 })
  async findAll(): Promise<PenaltyTypeDto[]> {
    return await this.penaltyTypeService.findAll();
  }

  @Post()
  @ApiBody({ type: CreatePenaltyTypeDto })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  async create(@Body() dto: CreatePenaltyTypeDto) {
    return await this.penaltyTypeService.create(dto);
  }

  @Put(':penaltyTypeId')
  @ApiParam({
    name: 'penaltyTypeId',
    description: 'Penalty Type ID',
    type: 'number',
  })
  @ApiBody({ type: UpdatePenaltyTypeDto })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404 })
  @ApiResponse({ status: 400 })
  async update(
    @Param('penaltyTypeId', ParseIntPipe) penaltyTypeId: number,
    @Body() dto: CreatePenaltyTypeDto,
  ) {
    return await this.penaltyTypeService.update(penaltyTypeId, dto);
  }
}
