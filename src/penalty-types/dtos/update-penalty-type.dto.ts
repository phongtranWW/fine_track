import { ApiProperty } from '@nestjs/swagger';

export class UpdatePenaltyTypeDto {
  @ApiProperty({
    required: false,
    description: 'Penalty Name',
    example: 'Bồi thường (BT)',
  })
  penaltyName?: string;
}
