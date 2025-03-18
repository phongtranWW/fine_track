import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PenaltyType } from './entities/penalty-type.entity';
import { Repository } from 'typeorm';
import { CreatePenaltyTypeDto } from './dtos/create-penalty-type.dto';
import { UpdatePenaltyTypeDto } from './dtos/update-penalty-type.dto';

@Injectable()
export class PenaltyTypeService {
  constructor(
    @InjectRepository(PenaltyType)
    private readonly repository: Repository<PenaltyType>,
  ) {}

  async create(dto: CreatePenaltyTypeDto) {
    try {
      await this.repository.insert({ ...dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(penaltyTypeId: number, dto: UpdatePenaltyTypeDto) {
    const penaltyType = await this.repository.findOneBy({ penaltyTypeId });

    if (!penaltyType) {
      throw new NotFoundException('Penalty type not found');
    }

    try {
      await this.repository.update(penaltyTypeId, { ...dto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      const penaltyTypes = await this.repository.find({
        select: {
          penaltyTypeId: true,
          penaltyName: true,
        },
      });
      return penaltyTypes.map((penaltyType) => ({
        penaltyTypeId: penaltyType.penaltyTypeId,
        penaltyName: penaltyType.penaltyName,
      }));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
