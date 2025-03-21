import { ApiProperty } from '@nestjs/swagger';

export class AddPaymentDto {
  @ApiProperty({ required: true, description: 'Penalty Type ID', example: 1 })
  penaltyTypeId: number;

  @ApiProperty({ required: true, description: 'Payment Amount', example: 5000 })
  paymentAmount: number;

  @ApiProperty({
    required: false,
    description: 'Payment Location',
    example: 'HCM',
  })
  paymentLocation?: string;

  @ApiProperty({
    required: false,
    description: 'Payment Date',
    example: '2023-01-01',
    format: 'date',
  })
  paymentDate?: Date;
}
