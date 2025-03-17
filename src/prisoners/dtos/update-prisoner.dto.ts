import { ApiProperty } from '@nestjs/swagger';

export class UpdatePrisonerDto {
  @ApiProperty({ required: false })
  prisonerName?: string;

  @ApiProperty({ required: false, format: 'date' })
  dob?: Date;

  @ApiProperty({ required: false })
  pob?: string;
}
