import { Module, Type, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AlarmEntity } from '../infrasctructure/persistence/orm/entities/alarm.entity';
import { AlarmController } from '../presenters/http/alarm.controller';
import { AlarmService } from './alarm.service';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { AlarmRepository } from './ports/alarm.reposity';
import { InMemoryAlarmRepository } from '../infrasctructure/persistence/in-memory/repositories/alarm.repository';
import { OrmAlarmRepository } from '../infrasctructure/persistence/orm/repositories/alarm.repository';
import 'dotenv/config'
import { InMemoryPersistenceModule } from '../infrasctructure/persistence/in-memory/in-memory-persistence.module';

@Module({
  
  imports: [
    process.env.USE_IN_MEMORY === 'true' ? InMemoryPersistenceModule : TypeOrmModule.forFeature([AlarmEntity]),
  ],
  controllers: [AlarmController],
  providers: [
    AlarmService,
    AlarmFactory,
    {
      provide: AlarmRepository,
      useClass:
        process.env.USE_IN_MEMORY === 'true'
          ? InMemoryAlarmRepository
          : OrmAlarmRepository,
    },
  ],
  exports: [AlarmRepository],
})
export class AlarmModule {
  // static withInfrastructure(infrastructureModule: Type | DynamicModule) {
  //   return {
  //     module: AlarmModule,
  //     imports: [infrastructureModule],
  //     exports: [AlarmRepository],
  //   };
  // }
}
