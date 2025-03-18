import { ApiProperty } from '@nestjs/swagger';

export class UpdateLegalCaseDto {
  @ApiProperty({
    required: false,
    description: 'Judgement ID',
    example: 'J2024001',
  })
  judgementId?: string;

  @ApiProperty({ required: false, description: 'Prisoner ID', example: 1 })
  prisonerId?: number;
}
