import { ApiProperty } from '@nestjs/swagger';

export class RemainingFineDto {
  @ApiProperty({ description: 'Judgement ID', example: 'J2024001' })
  judgementId: string;

  @ApiProperty({ description: 'Prisoner ID', example: 1 })
  prisonerId: number;

  @ApiProperty({ description: 'Prisoner Name', example: 'Nguyen Van A' })
  prisonerName: string;

  @ApiProperty({ description: 'Date of Birth', example: '2023-01-01' })
  dob: Date;

  @ApiProperty({ description: 'Place of Birth', example: 'TP. HCM' })
  pob: string;

  @ApiProperty({ description: 'Penalty Name', example: 'Bồi thường (BT)' })
  penaltyName: string;

  @ApiProperty({ description: 'Total Amount', example: 5000 })
  totalFine: number;

  @ApiProperty({ description: 'Paid Amount', example: 5000 })
  paidAmount: number;

  @ApiProperty({ description: 'Remaining Amount', example: 5000 })
  remainingAmount: number;

  @ApiProperty({ description: 'Status', example: 'Nợ' })
  status: string;
}
