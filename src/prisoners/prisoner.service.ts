import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Prisoner } from './entities/prisoner.entity';
import { ILike, Repository } from 'typeorm';
import { CreatePrisonerDto } from './dtos/create-prisoner.dto';
import { UpdatePrisonerDto } from './dtos/update-prisoner.dto';
import { PrisonerDto } from './dtos/prisoner.dto';

@Injectable()
export class PrisonerService {
  constructor(
    @InjectRepository(Prisoner)
    private readonly prisonerRepository: Repository<Prisoner>,
  ) {}

  async create(createPrisonerDto: CreatePrisonerDto) {
    try {
      await this.prisonerRepository.insert({ ...createPrisonerDto });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(prisonerId: number, updatePrisonerDto: UpdatePrisonerDto) {
    const prisoner = await this.prisonerRepository.findOneBy({
      prisonerId,
    });

    if (!prisoner) {
      throw new NotFoundException('Prisoner not found');
    }

    try {
      await this.prisonerRepository.update(prisonerId, {
        ...updatePrisonerDto,
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findMany(
    page: number,
    limit: number,
    name?: string,
    dob?: Date,
    pob?: string,
  ): Promise<PrisonerDto[]> {
    try {
      const conditions = {};
      if (name) {
        conditions['prisonerName'] = ILike(`%${name}%`);
      }
      if (dob) {
        conditions['dob'] = dob;
      }
      if (pob) {
        conditions['pob'] = ILike(`%${pob}%`);
      }

      const prisoners = await this.prisonerRepository.find({
        where: conditions,
        take: limit,
        skip: (page - 1) * limit,
      });
      return prisoners.map((prisoner) => ({
        prisonerId: prisoner.prisonerId,
        prisonerName: prisoner.prisonerName,
        dob: prisoner.dob,
        pob: prisoner.pob,
      }));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
