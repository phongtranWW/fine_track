import { ApiProperty } from '@nestjs/swagger';

export class UpdatePenaltyDto {
  @ApiProperty({ required: false, description: 'Penalty Type ID', example: 1 })
  penaltyTypeId?: number;

  @ApiProperty({
    required: false,
    description: 'Penalty Amount',
    example: 5000,
  })
  penaltyAmount?: number;
}
