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
  ): Promise<PrisonerDto[]> {
    try {
      const condition = name ? { prisonerName: ILike(`%${name}%`) } : {};
      const prisoners = await this.prisonerRepository.find({
        where: condition,
        take: limit,
        skip: limit * (page - 1),
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
