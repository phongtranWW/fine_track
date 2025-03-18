import { ApiProperty } from '@nestjs/swagger';

export class PenaltyTypeDto {
  @ApiProperty()
  penaltyTypeId: number;

  @ApiProperty()
  penaltyName: string;
}
