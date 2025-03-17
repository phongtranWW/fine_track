import { registerAs } from '@nestjs/config';
import { Judgement } from 'src/judgements/entities/judgement.entity';
import { LegalCase } from 'src/legal-cases/entities/legal-case.entity';
import { Payment } from 'src/legal-cases/entities/payment.entity';
import { Prisoner } from 'src/prisoners/entities/prisoner.entity';

export const typeOrmConfig = registerAs('typeOrm', () => ({
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: parseInt(process.env.TYPEORM_PORT, 10),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: [Prisoner, Payment, Judgement, LegalCase],
  synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
}));
