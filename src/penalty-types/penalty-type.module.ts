import { Module } from '@nestjs/common';
import { PenaltyTypeService } from './penalty-type.service';
import { PenaltyTypeController } from './penalty-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PenaltyType } from './entities/penalty-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PenaltyType])],
  controllers: [PenaltyTypeController],
  providers: [PenaltyTypeService],
})
export class PenaltyTypeModule {}
