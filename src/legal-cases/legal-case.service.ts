import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CreateLegalCaseDto } from './dtos/create-legal-case.entity';
import { LegalCase } from './entities/legal-case.entity';
import { UpdateLegalCaseDto } from './dtos/update-legal-case.dto';
import { Penalty } from './entities/penalty.entity';
import { AddPenaltyDto } from './dtos/add-penalty.dto';
import { UpdatePenaltyDto } from './dtos/update-penalty.dto';
import { AddPaymentDto } from './dtos/add-payment.dto';
import { Payment } from './entities/payment.entity';
import { LegalCaseDto } from './dtos/legal-case.dto';

@Injectable()
export class LegalCaseService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  // Legal Cases
  async create(dto: CreateLegalCaseDto) {
    try {
      await this.entityManager.insert(LegalCase, { ...dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(caseId: number, dto: UpdateLegalCaseDto) {
    const legalCase = await this.entityManager.findOne(LegalCase, {
      where: { caseId },
    });

    if (!legalCase) {
      throw new NotFoundException('Legal Case not found');
    }

    try {
      await this.entityManager.update(LegalCase, caseId, { ...dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getLegalCases(prisonerId: number): Promise<LegalCaseDto[]> {
    const prisonerLegalCase = await this.entityManager
      .createQueryBuilder(LegalCase, 'lc')
      .leftJoin('lc.penalties', 'pe')
      .leftJoin('pe.penaltyType', 'pe_pet')
      .leftJoin('lc.payments', 'pm')
      .leftJoin('pm.penaltyType', 'pm_pet')
      .select([
        'lc.caseId',
        'pe.penaltyId',
        'pe.penaltyTypeId',
        'pe_pet.penaltyName',
        'pe.penaltyAmount',
        'pm.paymentId',
        'pm.penaltyTypeId',
        'pm_pet.penaltyName',
        'pm.paymentAmount',
        'pm.paymentLocation',
        'pm.paymentDate',
      ])
      .where('lc.prisonerId = :prisonerId', { prisonerId })
      .getMany();

    return prisonerLegalCase.map((legalCase) => {
      return {
        caseId: legalCase.caseId,
        penalties: legalCase.penalties.map((penalty) => ({
          penaltyId: penalty.penaltyId,
          penaltyName: penalty.penaltyType.penaltyName,
          penaltyTypeId: penalty.penaltyTypeId,
          penaltyAmount: penalty.penaltyAmount,
        })),
        payments: legalCase.payments.map((payment) => ({
          paymentId: payment.paymentId,
          penaltyTypeId: payment.penaltyTypeId,
          penaltyName: payment.penaltyType.penaltyName,
          paymentAmount: payment.paymentAmount,
          paymentLocation: payment.paymentLocation,
          paymentDate: payment.paymentDate,
        })),
      };
    });
  }

  // Legal Case Penalties
  async addPenalty(caseId: number, dto: AddPenaltyDto) {
    const legalCase = await this.entityManager.findOne(LegalCase, {
      where: { caseId },
    });

    if (!legalCase) {
      throw new NotFoundException('Legal Case not found');
    }

    try {
      await this.entityManager.insert(Penalty, {
        ...dto,
        caseId,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePenalty(
    caseId: number,
    penaltyId: number,
    dto: UpdatePenaltyDto,
  ) {
    const penalty = await this.entityManager.findOne(Penalty, {
      where: { penaltyId, caseId },
    });

    if (!penalty) {
      throw new NotFoundException('Penalty not found');
    }

    try {
      await this.entityManager.update(
        Penalty,
        { penaltyId, caseId },
        { ...dto },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deletePenalty(caseId: number, penaltyId: number) {
    const penalty = await this.entityManager.findOne(Penalty, {
      where: { penaltyId: penaltyId, caseId },
    });

    if (!penalty) {
      throw new NotFoundException('Penalty not found');
    }

    try {
      await this.entityManager.delete(Penalty, {
        penaltyId,
        caseId: caseId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  // Legal Case Payments
  async addPayment(caseId: number, dto: AddPaymentDto) {
    const legalCase = await this.entityManager.findOne(LegalCase, {
      where: { caseId },
    });

    if (!legalCase) {
      throw new NotFoundException('Legal Case not found');
    }

    try {
      await this.entityManager.insert(Payment, {
        ...dto,
        caseId,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updatePayment(
    caseId: number,
    paymentId: number,
    dto: UpdatePenaltyDto,
  ) {
    const payment = await this.entityManager.findOne(Payment, {
      where: { paymentId, caseId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }
    try {
      await this.entityManager.update(
        Payment,
        { paymentId, caseId },
        { ...dto },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deletePayment(caseId: number, paymentId: number) {
    const payment = await this.entityManager.findOne(Payment, {
      where: { paymentId, caseId },
    });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    try {
      await this.entityManager.delete(Payment, {
        paymentId,
        caseId,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
