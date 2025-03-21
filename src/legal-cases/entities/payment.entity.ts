import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LegalCase } from './legal-case.entity';
import { PenaltyType } from 'src/penalty-types/entities/penalty-type.entity';

@Entity('payment')
export class Payment {
  @PrimaryGeneratedColumn('increment', { name: 'payment_id' })
  paymentId: number;

  @Column({ name: 'case_id', type: 'int' })
  caseId: number;

  @Column({ name: 'penalty_type_id', type: 'int' })
  penaltyTypeId: number;

  @Column({ name: 'payment_amount', type: 'numeric', nullable: true })
  paymentAmount: number;

  @Column({ name: 'payment_location', type: 'text', nullable: true })
  paymentLocation: string;

  @Column({ name: 'payment_date', type: 'date', nullable: true })
  paymentDate: Date;

  @ManyToOne(() => LegalCase, (legalCase) => legalCase.payments)
  @JoinColumn({ name: 'case_id' })
  legalCase: LegalCase;

  @ManyToOne(() => PenaltyType)
  @JoinColumn({ name: 'penalty_type_id' })
  penaltyType: PenaltyType;
}
