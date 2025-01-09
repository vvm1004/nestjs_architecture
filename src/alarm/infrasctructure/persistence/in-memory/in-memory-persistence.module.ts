import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './entities/alarm.entity';
import { AlarmRepository } from 'src/alarm/application/ports/alarm.reposity';
import { InMemoryAlarmRepository } from './repositories/alarm.repository';

@Module({
  imports: [],
  providers: [
    {
      provide: AlarmRepository,
      useClass: InMemoryAlarmRepository
    },
  ],
  exports: [AlarmRepository]  
})
export class InMemoryPersistenceModule {}

