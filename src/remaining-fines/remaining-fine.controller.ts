import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { RemainingFineService } from './remaining-fine.service';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { RemainingFineDto } from './dtos/remaining-fine.dto';

@Controller('remaining-fines')
export class RemainingFineController {
  constructor(private readonly remainingFineService: RemainingFineService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    required: true,
  })
  @ApiQuery({
    name: 'prisonerName',
    required: false,
  })
  @ApiQuery({
    name: 'prisonerName',
    required: false,
  })
  @ApiQuery({
    name: 'dob',
    required: false,
  })
  @ApiQuery({
    name: 'pob',
    required: false,
  })
  @ApiResponse({ status: 200, type: [RemainingFineDto] })
  async findMany(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('prisonerName') prisonerName: string,
    @Query('dob') dob: string,
    @Query('pob') pob: string,
  ) {
    return await this.remainingFineService.findMany(
      page,
      limit,
      prisonerName,
      dob,
      pob,
    );
  }
}
