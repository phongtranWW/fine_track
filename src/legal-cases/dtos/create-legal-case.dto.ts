import { ApiProperty } from '@nestjs/swagger';

export class CreateLegalCaseDto {
  @ApiProperty({
    required: true,
  })
  totalFine: number;
}
