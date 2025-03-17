import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Judgement } from './entities/judgement.entity';
import { Repository } from 'typeorm';
import { CreateJudgementDto } from './dtos/create-judgement.dto';
import { JudgementDto } from './dtos/judgement.dto';
import { UpdateJudgementDto } from './dtos/update-judgement.dto';

@Injectable()
export class JudgementService {
  constructor(
    @InjectRepository(Judgement)
    private readonly repository: Repository<Judgement>,
  ) {}

  async create(createJudgementDto: CreateJudgementDto) {
    try {
      await this.repository.insert({ ...createJudgementDto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(judgementId: string, updateJudgementDto: UpdateJudgementDto) {
    try {
      await this.repository.update(judgementId, { ...updateJudgementDto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findMany(page: number, limit: number): Promise<JudgementDto[]> {
    const judgements = await this.repository.find({
      take: limit,
      skip: limit * (page - 1),
    });

    return judgements.map((judgement) => ({
      judgementId: judgement.judgementId,
      judgementDate: judgement.judgementDate,
    }));
  }

  async delete(judgementId: string) {
    try {
      await this.repository.delete(judgementId);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
