import { ApiProperty } from '@nestjs/swagger';

export class CreatePrisonerDto {
  @ApiProperty()
  prisonerName: string;

  @ApiProperty({
    required: false,
    format: 'date',
  })
  dob?: Date;

  @ApiProperty({
    required: false,
  })
  pob?: string;
}
