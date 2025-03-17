import { ApiProperty } from '@nestjs/swagger';

export class AddPaymentDto {
  @ApiProperty()
  amount: number;

  @ApiProperty({ format: 'date' })
  paymentDate: Date;
}
