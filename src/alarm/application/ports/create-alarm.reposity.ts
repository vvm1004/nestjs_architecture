import { Alarm } from "src/alarm/domain/alarm";

export abstract class CreateAlarmRepository {
    abstract save(alarm: Alarm): Promise<Alarm>;

}