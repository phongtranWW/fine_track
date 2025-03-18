import { ApiProperty } from '@nestjs/swagger';

export class PenaltyDto {
  @ApiProperty({ example: 1, description: 'Penalty ID' })
  penaltyId: number;

  @ApiProperty({
    example: 'Án phí hình sự sơ thẩm (APHSST)',
    description: 'Penalty name',
  })
  penaltyName: string;

  @ApiProperty({ example: 1, description: 'Penalty Type ID' })
  penaltyTypeId: number;

  @ApiProperty({ example: 500000, description: 'Penalty amount' })
  penaltyAmount: number;
}

export class PaymentDto {
  @ApiProperty({ example: 10, description: 'Payment ID' })
  paymentId: number;

  @ApiProperty({
    example: 'Án phí hình sự sơ thẩm (APHSST)',
    description: 'Penalty name',
  })
  penaltyName: string;

  @ApiProperty({ example: 100, description: 'Penalty Type ID' })
  penaltyTypeId: number;

  @ApiProperty({ example: 200000, description: 'Payment amount' })
  paymentAmount: number;

  @ApiProperty({ example: 'Hanoi', description: 'Payment location' })
  paymentLocation: string;

  @ApiProperty({
    example: '2024-03-18',
    description: 'Payment date',
    type: 'string',
    format: 'date',
  })
  paymentDate: Date;
}

export class LegalCaseDto {
  @ApiProperty({ example: 1, description: 'Case ID' })
  caseId: number;

  @ApiProperty({ type: [PenaltyDto], description: 'List of penalties' })
  penalties: PenaltyDto[];

  @ApiProperty({ type: [PaymentDto], description: 'List of payments' })
  payments: PaymentDto[];
}
