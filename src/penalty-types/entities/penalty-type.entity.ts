import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('penalty_type')
export class PenaltyType {
  @PrimaryGeneratedColumn('increment', { name: 'penalty_type_id' })
  penaltyTypeId: number;

  @Column({ name: 'penalty_name', type: 'text' })
  penaltyName: string;
}
