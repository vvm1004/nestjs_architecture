



import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FindAlarmsRepository } from "src/alarm/application/ports/find-alarms.repository";
import { MaterializedAlarmView } from "../schemas/materialized-alarm-views.schema";
import { Model } from "mongoose";
import { AlarmReadModel } from "src/alarm/domain/read-models/alarm.read-model";

@Injectable()
export class OrmFindAlarmRepository implements FindAlarmsRepository {
    constructor(
        @InjectModel(MaterializedAlarmView.name)
        private readonly alarmModel: Model<MaterializedAlarmView>
    ){
    }

    async findAll(): Promise<AlarmReadModel[]> {
        return await this.alarmModel.find()
    }
}