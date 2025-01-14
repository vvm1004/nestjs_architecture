import { Module, Type, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { AlarmEntity } from '../infrasctructure/persistence/orm/entities/alarm.entity';
import { AlarmController } from '../presenters/http/alarm.controller';
import { AlarmService } from './alarm.service';
import { AlarmFactory } from '../domain/factories/alarm.factory';
// import { AlarmRepository } from './ports/create-alarm.reposity';
import { InMemoryAlarmRepository } from '../infrasctructure/persistence/in-memory/repositories/alarm.repository';
// import { OrmAlarmRepository } from '../infrasctructure/persistence/orm/repositories/create-alarm.repository';
import 'dotenv/config';
import { InMemoryPersistenceModule } from '../infrasctructure/persistence/in-memory/in-memory-persistence.module';
import { CreateAlarmCommandHandler } from './commands/create-alarm.command-handler';
import { GetAlarmsQueryHandler } from './queries/get-alarms.query-handlers';
import { AlarmCreatedEventHandler } from './event-handlers/alarm-created.event-handler';
import { AlarmItemEntity } from '../infrasctructure/persistence/orm/entities/alarm-item.entity';
import { CreateAlarmRepository } from './ports/create-alarm.reposity';
import { FindAlarmsRepository } from './ports/find-alarms.repository';
import { UpsertMaterializedAlarmRepository } from './ports/upsert-materialized-alarm.repository';
import { OrmCreateAlarmRepository } from '../infrasctructure/persistence/orm/repositories/create-alarm.repository';
import { OrmFindAlarmRepository } from '../infrasctructure/persistence/orm/repositories/find-alarms.repository';
import { OrmUpsertMaterializedAlarmRepository } from '../infrasctructure/persistence/orm/repositories/upsert-materialized-alarm.repository';
import { MongooseModule } from '@nestjs/mongoose';
import {
  MaterializedAlarmView,
  MaterializedAlarmViewSchema,
} from '../infrasctructure/persistence/orm/schemas/materialized-alarm-views.schema';
import { OrmAlarmPersistenceModule } from '../infrasctructure/persistence/orm/orm-persistence.module';

@Module({
  imports: [
    ...(process.env.DB_DRIVER === 'orm'
      ? [
          TypeOrmModule.forFeature([AlarmEntity, AlarmItemEntity]),
          MongooseModule.forFeature([
            { name: MaterializedAlarmView.name, schema: MaterializedAlarmViewSchema },
          ]),
        ]
      : []),
  ],
  controllers: [AlarmController],
  providers: [
    AlarmService,
    AlarmFactory,
    // {
    //   provide: AlarmRepository,
    //   useClass:
    //     process.env.USE_IN_MEMORY === 'true'
    //       ? InMemoryAlarmRepository
    //       : OrmAlarmRepository,
    // },
    {
      provide: CreateAlarmRepository,
      useClass:
        process.env.DB_DRIVER  === 'in-memory'
          ? InMemoryAlarmRepository
          : OrmCreateAlarmRepository,
    },
    {
      provide: FindAlarmsRepository,
      useClass:
        process.env.DB_DRIVER  === 'in-memory'
          ? InMemoryAlarmRepository
          : OrmFindAlarmRepository,
    },
    {
      provide: UpsertMaterializedAlarmRepository,
      useClass:
        process.env.DB_DRIVER  === 'in-memory'
          ? InMemoryAlarmRepository
          : OrmUpsertMaterializedAlarmRepository,
    },
    CreateAlarmCommandHandler,
    GetAlarmsQueryHandler,
    AlarmCreatedEventHandler,
  ],
  // exports: [AlarmRepository],
  exports: [
    CreateAlarmRepository,
    FindAlarmsRepository,
    UpsertMaterializedAlarmRepository,
  ],
})
export class AlarmModule {
  // static withInfrastructure(infrastructureModule: Type | DynamicModule) {
  //   return {
  //     module: AlarmModule,
  //     imports: [infrastructureModule],
  //     exports: [CreateAlarmRepository, FindAlarmsRepository, UpsertMaterializedAlarmRepository],
  //   };
  // }

}
