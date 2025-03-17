import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { RemainingFineDto } from './dtos/remaining-fine.dto';
import { CreateLegalCaseDto } from './dtos/create-legal-case.dto';
import { UpdateLegalCaseDto } from './dtos/update-legal-case.dto';
import { AddPaymentDto } from './dtos/add-payment.dto';
import { LegalCase } from './entities/legal-case.entity';
import { Payment } from './entities/payment.entity';

@Injectable()
export class LegalCaseService {
  constructor(
    @InjectEntityManager() private readonly entityManager: EntityManager,
  ) {}

  async getRemainingFine(
    page: number,
    limit: number,
  ): Promise<RemainingFineDto[]> {
    return await this.entityManager.query(
      `
        SELECT
          lc.judgement_id,
          lc.prisoner_id,
          lc.total_fine,
          COALESCE(SUM(p.amount), 0) AS total_paid,
          (lc.total_fine - COALESCE(SUM(p.amount), 0)) AS remaining_fine
        FROM legal_case lc
        LEFT JOIN payment p
        ON lc.judgement_id = p.judgement_id AND lc.prisoner_id = p.prisoner_id
        GROUP BY lc.judgement_id, lc.prisoner_id, lc.total_fine
        LIMIT $1 OFFSET $2;
      `,
      [limit, limit * (page - 1)],
    );
  }

  async getPrisonerRemainingFine(
    page: number,
    limit: number,
    prisonerId: number,
  ) {
    return await this.entityManager.query(
      `
        SELECT
          lc.judgement_id,
          lc.prisoner_id,
          lc.total_fine,
          COALESCE(SUM(p.amount), 0) AS total_paid,
          (lc.total_fine - COALESCE(SUM(p.amount), 0)) AS remaining_fine
        FROM legal_case lc
        LEFT JOIN payment p
        ON lc.judgement_id = p.judgement_id AND lc.prisoner_id = p.prisoner_id
        WHERE lc.prisoner_id = $1
        GROUP BY lc.judgement_id, lc.prisoner_id, lc.total_fine
        LIMIT $2 OFFSET $3;
      `,
      [prisonerId, limit, limit * (page - 1)],
    );
  }

  async create(
    judgementId: string,
    prisonerId: number,
    createLegalCaseDto: CreateLegalCaseDto,
  ) {
    try {
      await this.entityManager.insert(LegalCase, {
        ...createLegalCaseDto,
        judgementId,
        prisonerId,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    judgementId: string,
    prisonerId: number,
    updateLegalCaseDto: UpdateLegalCaseDto,
  ) {
    try {
      await this.entityManager.update(
        LegalCase,
        { judgementId, prisonerId },
        { ...updateLegalCaseDto },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(judgementId: string, prisonerId: number) {
    try {
      await this.entityManager.delete(LegalCase, {
        judgement_id: judgementId,
        prisoner_id: prisonerId,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async addPayment(
    judgementId: string,
    prisonerId: number,
    addPaymentDto: AddPaymentDto,
  ) {
    try {
      await this.entityManager.insert(Payment, {
        ...addPaymentDto,
        judgementId,
        prisonerId,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getPayments(judgementId: string, prisonerId: number) {
    try {
      return await this.entityManager.find(Payment, {
        where: { judgementId, prisonerId },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deletePayment(paymentId: number) {
    try {
      await this.entityManager.delete('payment', {
        paymentId,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
