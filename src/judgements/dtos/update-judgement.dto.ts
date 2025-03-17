import { ApiProperty } from '@nestjs/swagger';

export class UpdateJudgementDto {
  @ApiProperty({ required: false, format: 'date' })
  judgementDate?: Date;
}
