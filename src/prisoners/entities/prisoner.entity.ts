import { LegalCase } from 'src/legal-cases/entities/legal-case.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prisoner')
export class Prisoner {
  @PrimaryGeneratedColumn('increment', { name: 'prisoner_id' })
  prisonerId: number;

  @Column({ name: 'prisoner_name', type: 'text' })
  prisonerName: string;

  @Column({ name: 'dob', type: 'date', nullable: true })
  dob: Date;

  @Column({ name: 'pob', type: 'text', nullable: true })
  pob: string;

  @OneToMany(() => LegalCase, (legalCase) => legalCase.prisoner)
  legalCases: LegalCase[];
}
