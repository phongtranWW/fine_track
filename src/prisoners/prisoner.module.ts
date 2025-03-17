import { Module } from '@nestjs/common';
import { PrisonerService } from './prisoner.service';
import { PrisonerController } from './prisoner.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prisoner } from './entities/prisoner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Prisoner])],
  controllers: [PrisonerController],
  providers: [PrisonerService],
})
export class PrisonerModule {}
