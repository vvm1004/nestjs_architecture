import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entities/alarm.entity';
import { OrmCreateAlarmRepository } from './repositories/create-alarm.repository';
import { AlarmItemEntity } from './entities/alarm-item.entity';
import { CreateAlarmRepository } from 'src/alarm/application/ports/create-alarm.reposity';
import { FindAlarmsRepository } from 'src/alarm/application/ports/find-alarms.repository';
import { OrmFindAlarmRepository } from './repositories/find-alarms.repository';
import { OrmUpsertMaterializedAlarmRepository } from './repositories/upsert-materialized-alarm.repository';
import { UpsertMaterializedAlarmRepository } from 'src/alarm/application/ports/upsert-materialized-alarm.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { MaterializedAlarmView, MaterializedAlarmViewSchema } from './schemas/materialized-alarm-views.schema';
;

@Module({
  imports: [
    TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
    MongooseModule.forFeature([
      {name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema}
    ])
  ],
  providers: [
        {
          provide: CreateAlarmRepository,
          useClass: OrmCreateAlarmRepository
        },
        {
          provide: FindAlarmsRepository,
          useClass: OrmFindAlarmRepository
        },
        {
          provide: UpsertMaterializedAlarmRepository,
          useClass: OrmUpsertMaterializedAlarmRepository
        },
  ],
  exports: [CreateAlarmRepository, FindAlarmsRepository, UpsertMaterializedAlarmRepository] 
})
export class OrmAlarmPersistenceModule {}
