import { Module } from "@nestjs/common";
import { OrmAlarmPersistenceModule } from "./orm/orm-persistence.module";
import { InMemoryPersistenceModule } from "./in-memory/in-memory-persistence.module";

@Module({})
export class AlarmsInfractructureModule {
  static use(driver: 'orm' | 'in-memory') {
    const persistenceModule =
      driver === 'orm' ? OrmAlarmPersistenceModule : InMemoryPersistenceModule;
    return {
      module: AlarmsInfractructureModule,
      imports: [persistenceModule],  
      exports: [persistenceModule],  
    };
  }
}