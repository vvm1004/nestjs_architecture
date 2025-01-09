import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entities/alarm.entity';
import { AlarmRepository } from 'src/alarm/application/ports/alarm.reposity';
import { OrmAlarmRepository } from './repositories/alarm.repository';
;

@Module({
  imports: [TypeOrmModule.forFeature([AlarmEntity])],
  providers: [
    {
      provide: AlarmRepository,
      useClass: OrmAlarmRepository
    },
  ],
  exports: [AlarmRepository] 
})
export class OrmAlarmPersistenceModule {}
