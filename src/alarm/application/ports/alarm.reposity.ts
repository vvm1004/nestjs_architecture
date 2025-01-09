import { Alarm } from "src/alarm/domain/alarm";

export abstract class AlarmRepository {
    abstract findAll(): Promise<Alarm[]>;
    abstract save(alarm: Alarm): Promise<Alarm>;

}