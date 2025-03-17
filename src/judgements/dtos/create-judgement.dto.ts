import { ApiProperty } from '@nestjs/swagger';

export class CreateJudgementDto {
  @ApiProperty({ required: true })
  judgementId: string;

  @ApiProperty({
    required: true,
    format: 'date',
  })
  judgementDate: Date;
}
