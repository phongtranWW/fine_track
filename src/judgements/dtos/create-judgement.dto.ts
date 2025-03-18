import { ApiProperty } from '@nestjs/swagger';

export class CreateJudgementDto {
  @ApiProperty({
    required: true,
    example: 'J2024001',
    description: 'Judgement ID',
  })
  judgementId: string;

  @ApiProperty({
    required: true,
    format: 'date',
    description: 'Judgement Date',
    example: '2023-01-01',
  })
  judgementDate: Date;
}
