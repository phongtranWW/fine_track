import { ApiProperty } from '@nestjs/swagger';

export class CreatePenaltyTypeDto {
  @ApiProperty({
    required: true,
    description: 'Penalty Name',
    example: 'Bồi thường (BT)',
  })
  penaltyName: string;
}
