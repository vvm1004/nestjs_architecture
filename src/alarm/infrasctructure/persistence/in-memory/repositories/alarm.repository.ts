import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {  CreateAlarmRepository } from "src/alarm/application/ports/create-alarm.reposity";
import { AlarmEntity } from "../entities/alarm.entity";
import { Repository } from "typeorm";
import { Alarm } from "src/alarm/domain/alarm";
import { AlarmMapper } from "../mapper/alarm.mapper";
import { FindAlarmsRepository } from "src/alarm/application/ports/find-alarms.repository";
import { UpsertMaterializedAlarmRepository } from "src/alarm/application/ports/upsert-materialized-alarm.repository";
import { AlarmReadModel } from "src/alarm/domain/read-models/alarm.read-model";

@Injectable()
export class InMemoryAlarmRepository implements CreateAlarmRepository, FindAlarmsRepository, UpsertMaterializedAlarmRepository {
    private readonly alarms = new Map<string, AlarmEntity>();
    private readonly materializedAlarmViews = new Map<string, AlarmReadModel>();

    async findAll(): Promise<AlarmReadModel[]> {
    console.log('Fetching all alarms:', Array.from(this.materializedAlarmViews.values()));

        return Array.from(this.materializedAlarmViews.values())
    }

 async save(alarm: Alarm): Promise<Alarm> {
    const persistenceModel = AlarmMapper.toPersistence(alarm);
    console.log('Saving alarm with id:', persistenceModel.id);
    this.alarms.set(persistenceModel.id, persistenceModel);
    const newEntity = this.alarms.get(persistenceModel.id);
    console.log('Saved alarm:', newEntity);
    return AlarmMapper.toDomain(newEntity);
}

    async upsert(alarm: Pick<AlarmReadModel, "id"> & Partial<AlarmReadModel>): Promise<void> {
    
        if(this.materializedAlarmViews.has(alarm.id)){
            this.materializedAlarmViews.set(alarm.id, {
                ...this.materializedAlarmViews.get(alarm.id),
                ...alarm
            });
            return;
        }
        console.log('Inserting new alarm');

        this.materializedAlarmViews.set(alarm.id, alarm as AlarmReadModel)
    
    }
}