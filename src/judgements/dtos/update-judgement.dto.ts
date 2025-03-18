import { ApiProperty } from '@nestjs/swagger';

export class UpdateJudgementDto {
  @ApiProperty({
    required: false,
    format: 'date',
    description: 'Judgement Date',
    example: '2023-01-01',
  })
  judgementDate: Date;
}
