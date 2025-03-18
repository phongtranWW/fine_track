import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrisonerModule } from './prisoners/prisoner.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgementModule } from './judgements/judgement.module';
import { PenaltyTypeModule } from './penalty-types/penalty-type.module';
import { LegalCaseModule } from './legal-cases/legal-case.module';
import { RemainingFineModule } from './remaining-fines/remaining-fine.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.getOrThrow('typeOrm'),
    }),
    PrisonerModule,
    JudgementModule,
    PenaltyTypeModule,
    LegalCaseModule,
    RemainingFineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
