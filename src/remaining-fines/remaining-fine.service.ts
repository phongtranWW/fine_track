import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { RemainingFineDto } from './dtos/remaining-fine.dto';

@Injectable()
export class RemainingFineService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async findMany(
    page: number,
    limit: number,
    prisonerName?: string,
    dob?: string,
    pob?: string,
  ): Promise<RemainingFineDto[]> {
    const queryBuilder = this.entityManager
      .createQueryBuilder()
      .select([
        'mv.judgement_id AS "judgementId"',
        'mv.prisoner_id AS "prisonerId"',
        'mv.prisoner_name AS "prisonerName"',
        'mv.dob AS "dateOfBirth"',
        'mv.pob AS "placeOfBirth"',
        'mv.penalty_name AS "penaltyName"',
        'mv.total_fine AS "totalFine"',
        'mv.paid_amount AS "paidAmount"',
        'mv.remaining_amount AS "remainingAmount"',
        'mv.status AS "paymentStatus"',
      ])
      .from('mv_remaining_fine', 'mv');

    if (prisonerName) {
      queryBuilder.andWhere('mv.prisoner_name ILIKE :prisonerName', {
        prisonerName: `%${prisonerName}%`,
      });
    }
    if (dob) {
      queryBuilder.andWhere('mv.dob = :dob', { dob });
    }
    if (pob) {
      queryBuilder.andWhere('mv.pob ILIKE :pob', { pob: `%${pob}%` });
    }

    queryBuilder
      .orderBy('mv.prisoner_name', 'ASC')
      .limit(limit)
      .offset(limit * (page - 1));

    return queryBuilder.getRawMany();
  }
}
