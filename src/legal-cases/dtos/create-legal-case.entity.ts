import { ApiProperty } from '@nestjs/swagger';

export class CreateLegalCaseDto {
  @ApiProperty({
    required: true,
    description: 'Judgement ID',
    example: 'J2024001',
  })
  judgementId: string;

  @ApiProperty({ required: true, description: 'Prisoner ID', example: 1 })
  prisonerId: number;
}
