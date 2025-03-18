import { ApiProperty } from '@nestjs/swagger';

export class AddPenaltyDto {
  @ApiProperty({ required: true, description: 'Penalty Type ID', example: 1 })
  penaltyTypeId: number;

  @ApiProperty({ required: true, description: 'Penalty Amount', example: 5000 })
  penaltyAmount: number;
}
