import { Module } from '@nestjs/common';
import { JudgementService } from './judgement.service';
import { JudgementController } from './judgement.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Judgement } from './entities/judgement.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Judgement])],
  controllers: [JudgementController],
  providers: [JudgementService],
})
export class JudgementModule {}
