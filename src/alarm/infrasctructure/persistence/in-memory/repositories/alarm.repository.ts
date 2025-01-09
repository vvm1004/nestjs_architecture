import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlarmRepository } from "src/alarm/application/ports/alarm.reposity";
import { AlarmEntity } from "../entities/alarm.entity";
import { Repository } from "typeorm";
import { Alarm } from "src/alarm/domain/alarm";
import { AlarmMapper } from "../mapper/alarm.mapper";

@Injectable()
export class InMemoryAlarmRepository implements AlarmRepository {
    private readonly alarms = new Map<string, AlarmEntity>();

    async findAll(): Promise<Alarm[]> {
        const entities = Array.from(this.alarms.values())
        return entities.map((item) => AlarmMapper.toDomain(item))
    }

    async save(alarm: Alarm): Promise<Alarm> {
        const persistenceModel = AlarmMapper.toPersistence(alarm);
        this.alarms.set(persistenceModel.id, persistenceModel)
        const newEntity = this.alarms.get(persistenceModel.id);
        return AlarmMapper.toDomain(newEntity);
    }
}