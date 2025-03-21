import { Module } from '@nestjs/common';
import { LegalCaseService } from './legal-case.service';
import { LegalCaseController } from './legal-case.controller';

@Module({
  controllers: [LegalCaseController],
  providers: [LegalCaseService],
})
export class LegalCaseModule {}
