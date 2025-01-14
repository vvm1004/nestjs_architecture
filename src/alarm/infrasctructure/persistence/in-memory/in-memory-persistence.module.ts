import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entities/alarm.entity';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';
import { FindAlarmsRepository } from 'src/alarm/application/ports/find-alarms.repository';
import { CreateAlarmRepository } from 'src/alarm/application/ports/create-alarm.reposity';
import { UpsertMaterializedAlarmRepository } from 'src/alarm/application/ports/upsert-materialized-alarm.repository';

@Module({
  imports: [],
  providers: [
    InMemoryAlarmRepository,
    {
      provide: CreateAlarmRepository,
      useExisting: InMemoryAlarmRepository
    },
    {
      provide: FindAlarmsRepository,
      useExisting: InMemoryAlarmRepository
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useExisting: InMemoryAlarmRepository
    }
  ],
  exports: [CreateAlarmRepository, FindAlarmsRepository, UpsertMaterializedAlarmRepository]  
})
export class InMemoryPersistenceModule {}

