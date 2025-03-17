import { ApiProperty } from '@nestjs/swagger';

export class UpdateLegalCaseDto {
  @ApiProperty({
    required: false,
  })
  totalFine?: number;
}
