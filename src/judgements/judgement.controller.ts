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
import { JudgementService } from './judgement.service';
import { CreateJudgementDto } from './dtos/create-judgement.dto';
import { UpdateJudgementDto } from './dtos/update-judgement.dto';
import { ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';

@Controller('judgements')
export class JudgementController {
  constructor(private readonly judgementService: JudgementService) {}

  @Get()
  @ApiQuery({ name: 'page', description: 'Page number', required: true })
  @ApiQuery({ name: 'limit', description: 'Limit number', required: true })
  async findMany(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.judgementService.findMany(page, limit);
  }

  @Post()
  @ApiBody({ type: CreateJudgementDto })
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
  async update(
    @Param('judgementId') judgementId: string,
    @Body() updateJudgementDto: UpdateJudgementDto,
  ) {
    return await this.judgementService.update(judgementId, updateJudgementDto);
  }

  @Delete(':judgementId')
  @ApiParam({
    name: 'judgementId',
    description: 'Judgement ID',
    required: true,
  })
  async delete(@Param('judgementId') judgementId: string) {
    return await this.judgementService.delete(judgementId);
  }
}
