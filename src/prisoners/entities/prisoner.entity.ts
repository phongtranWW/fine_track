import { LegalCase } from 'src/legal-cases/entities/legal-case.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('prisoner')
export class Prisoner {
  @PrimaryGeneratedColumn('increment', { name: 'prisoner_id' })
  prisonerId: number;

  @Column({ name: 'prisoner_name', type: 'text' })
  prisonerName: string;

  @Column({ name: 'dob', nullable: true, type: 'date' })
  dob: Date;

  @Column({ name: 'pob', nullable: true, type: 'text' })
  pob: string;

  @OneToMany(() => LegalCase, (legalCase) => legalCase.prisoner)
  legalCases: LegalCase[];
}
