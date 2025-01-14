import { Alarm } from "src/alarm/domain/alarm";
import { AlarmEntity } from "../entities/alarm.entity";
import { AlarmSeverity } from "src/alarm/domain/value-objects/alarm-severity";
import { AlarmItem } from "src/alarm/domain/alarm-item";
import { AlarmItemEntity } from "../entities/alarm-item.entity";

export class AlarmMapper {
    static toDomain(alarmEntity: AlarmEntity) : Alarm { 
        const alarmSeverity = new AlarmSeverity(
            alarmEntity.severity as 'critical' | 'low' | 'medium' | 'high',
        )
        const alarmModel = new Alarm(
            alarmEntity.id
        );
        alarmModel.name = alarmEntity.name;
        alarmModel.isAcknowledged = alarmEntity.isAcknowledge;
        alarmModel.severity = alarmSeverity
        alarmModel.triggeredAt = alarmEntity.triggeredAt
        alarmModel.items = alarmEntity.items.map(
            (item) => new AlarmItem(item.id, item.name, item.type),
        );

        return alarmModel
    }

    static toPersistence(alarm: Alarm){
        const entity = new AlarmEntity();
        entity.id = alarm.id;
        entity.name = alarm.name;
        entity.severity = alarm.severity.value;
        entity.isAcknowledge = alarm.isAcknowledged;
        entity.items = alarm.items.map((item) => {
            const itemEntity = new AlarmItemEntity();
            itemEntity.id = item.id;
            itemEntity.name = item.name;
            itemEntity.type = item.type;
            return itemEntity
        })
        return entity;
    }
}