import { LegalCase } from 'src/legal-cases/entities/legal-case.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('judgement')
export class Judgement {
  @PrimaryColumn({ type: 'text', name: 'judgement_id' })
  judgementId: string;

  @Column({ type: 'date', name: 'judgement_date' })
  judgementDate: Date;

  @OneToMany(() => LegalCase, (legalCase) => legalCase.judgement)
  legalCases: LegalCase[];
}
