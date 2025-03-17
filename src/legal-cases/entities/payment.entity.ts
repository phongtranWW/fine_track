import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LegalCase } from './legal-case.entity';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('increment', { name: 'payment_id' })
  paymentId: number;

  @Column({ type: 'text', name: 'judgement_id' })
  judgementId: string;

  @Column({ type: 'int', name: 'prisoner_id' })
  prisonerId: number;

  @Column({ type: 'numeric', name: 'amount' })
  amount: number;

  @Column({ type: 'date', name: 'payment_date' })
  paymentDate: Date;

  @ManyToOne(() => LegalCase, (legalCase) => legalCase.payment)
  @JoinColumn([
    {
      name: 'judgement_id',
      referencedColumnName: 'judgementId',
    },
    {
      name: 'prisoner_id',
      referencedColumnName: 'prisonerId',
    },
  ])
  legalCase: LegalCase;
}
