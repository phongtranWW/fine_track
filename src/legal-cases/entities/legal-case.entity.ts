import { Judgement } from 'src/judgements/entities/judgement.entity';
import { Prisoner } from 'src/prisoners/entities/prisoner.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { Payment } from './payment.entity';

@Entity('legal_case')
export class LegalCase {
  @PrimaryColumn({ type: 'text', name: 'judgement_id' })
  judgementId: string;

  @PrimaryColumn({ type: 'int', name: 'prisoner_id' })
  prisonerId: number;

  @Column({ type: 'numeric', name: 'total_fine' })
  totalFine: number;

  @ManyToOne(() => Judgement, (judgement) => judgement.legalCases)
  @JoinColumn({ name: 'judgement_id' })
  judgement: Judgement;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.legalCases)
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @OneToMany(() => Payment, (payment) => payment.legalCase)
  payment: Payment[];
}
