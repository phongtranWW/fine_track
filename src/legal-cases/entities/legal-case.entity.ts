import { Judgement } from 'src/judgements/entities/judgement.entity';
import { Prisoner } from 'src/prisoners/entities/prisoner.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Penalty } from './penalty.entity';
import { Payment } from './payment.entity';

@Entity({ name: 'legal_case' })
export class LegalCase {
  @PrimaryGeneratedColumn('increment', { name: 'case_id' })
  caseId: number;

  @Column({ name: 'judgement_id', type: 'text' })
  judgementId: string;

  @Column({ name: 'prisoner_id', type: 'int' })
  prisonerId: number;

  @ManyToOne(() => Prisoner, (prisoner) => prisoner.legalCases)
  @JoinColumn({ name: 'prisoner_id' })
  prisoner: Prisoner;

  @ManyToOne(() => Judgement, (judgement) => judgement.legalCases)
  @JoinColumn({ name: 'judgement_id' })
  judgement: Judgement;

  @OneToMany(() => Penalty, (penalty) => penalty.legalCase)
  penalties: Penalty[];

  @OneToMany(() => Payment, (payment) => payment.legalCase)
  payments: Payment[];
}
