import { Module } from '@nestjs/common';
import { RemainingFineController } from './remaining-fine.controller';
import { RemainingFineService } from './remaining-fine.service';

@Module({
  controllers: [RemainingFineController],
  providers: [RemainingFineService],
})
export class RemainingFineModule {}
