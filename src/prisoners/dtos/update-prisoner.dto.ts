import { ApiProperty } from '@nestjs/swagger';

export class UpdatePrisonerDto {
  @ApiProperty({
    required: false,
    description: 'Prisoner Name',
    example: 'Nguyen Van A',
  })
  prisonerName: string;

  @ApiProperty({
    required: false,
    format: 'date',
    description: 'Date of Birth',
    example: '2023-01-01',
  })
  dob: Date;

  @ApiProperty({
    required: false,
    description: 'Place of Birth',
    example: 'HCM',
  })
  pob: string;
}
