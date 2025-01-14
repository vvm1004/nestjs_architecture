import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetAlarmsQuery } from "./get-alarms.query";
import { Alarm } from "src/alarm/domain/alarm";
import { FindAlarmsRepository } from "../ports/find-alarms.repository";
import { AlarmReadModel } from "src/alarm/domain/read-models/alarm.read-model";

@QueryHandler(GetAlarmsQuery)
export class GetAlarmsQueryHandler implements IQueryHandler<GetAlarmsQuery, AlarmReadModel[]> {
    constructor(private readonly alarmRepository: FindAlarmsRepository){}
    async execute(query: GetAlarmsQuery): Promise<AlarmReadModel[]> {
        return this.alarmRepository.findAll();
    }
}