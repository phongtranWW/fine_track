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
import { JudgementService } from './judgement.service';
import { CreateJudgementDto } from './dtos/create-judgement.dto';
import { UpdateJudgementDto } from './dtos/update-judgement.dto';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JudgementDto } from './dtos/judgement.dto';

@Controller('judgements')
export class JudgementController {
  constructor(private readonly judgementService: JudgementService) {}

  @Get()
  @ApiQuery({ name: 'page', description: 'Page number', required: true })
  @ApiQuery({ name: 'limit', description: 'Limit number', required: true })
  @ApiResponse({ status: 200, type: [JudgementDto] })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async findMany(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.judgementService.findMany(page, limit);
  }

  @Post()
  @ApiBody({ type: CreateJudgementDto })
  @ApiResponse({ status: 201 })
  @ApiResponse({ status: 400 })
  async create(@Body() createJudgementDto: CreateJudgementDto) {
    return await this.judgementService.create(createJudgementDto);
  }

  @Put(':judgementId')
  @ApiParam({
    name: 'judgementId',
    description: 'Judgement ID',
    required: true,
  })
  @ApiBody({ type: UpdateJudgementDto })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 400 })
  @ApiResponse({ status: 404 })
  async update(
    @Param('judgementId') judgementId: string,
    @Body() updateJudgementDto: UpdateJudgementDto,
  ) {
    return await this.judgementService.update(judgementId, updateJudgementDto);
  }
}
