import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlarmModule } from './alarm/application/alarm.module';
import { CoreModule } from './core/core.module';
import { ApplicationBootstrapOptions } from './common/interfaces/application-bootstrap-option.interface';
import { AlarmsInfractructureModule } from './alarm/infrasctructure/persistence/alarm-infractructure.module';
import { OrmAlarmPersistenceModule } from './alarm/infrasctructure/persistence/orm/orm-persistence.module';
import { InMemoryPersistenceModule } from './alarm/infrasctructure/persistence/in-memory/in-memory-persistence.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlarmEntity } from './alarm/infrasctructure/persistence/orm/entities/alarm.entity';
@Module({
  imports: [AlarmModule, CoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static register(options: ApplicationBootstrapOptions) {
    
    return {
      module: AppModule,
      imports: [
        CoreModule.forRoot(options),
        // AlarmModule.withInfrastructure(
        //   AlarmsInfractructureModule.use(options.driver) 
        // ),
        ConfigModule.forRoot({
          isGlobal: true,
        })
              

      ],
    };
  }
}