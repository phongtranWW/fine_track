import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LegalCase } from './legal-case.entity';
import { PenaltyType } from 'src/penalty-types/entities/penalty-type.entity';

@Entity('penalty')
export class Penalty {
  @PrimaryGeneratedColumn('increment', { name: 'penalty_id' })
  penaltyId: number;

  @Column({ name: 'case_id', type: 'int' })
  caseId: number;

  @Column({ name: 'penalty_type_id', type: 'int' })
  penaltyTypeId: number;

  @Column({ name: 'penalty_amount', type: 'numeric', default: 0 })
  penaltyAmount: number;

  @ManyToOne(() => LegalCase, (legalCase) => legalCase.penalties)
  @JoinColumn({ name: 'case_id' })
  legalCase: LegalCase;

  @ManyToOne(() => PenaltyType)
  @JoinColumn({ name: 'penalty_type_id' })
  penaltyType: PenaltyType;
}
