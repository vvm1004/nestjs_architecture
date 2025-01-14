import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';  
import { Model } from 'mongoose';
import { UpsertMaterializedAlarmRepository } from 'src/alarm/application/ports/upsert-materialized-alarm.repository';
import { AlarmReadModel } from 'src/alarm/domain/read-models/alarm.read-model';
import { MaterializedAlarmView } from '../schemas/materialized-alarm-views.schema';

@Injectable()
export class OrmUpsertMaterializedAlarmRepository implements UpsertMaterializedAlarmRepository {
    constructor(
        @InjectModel(MaterializedAlarmView.name) private readonly alarmModel: Model<MaterializedAlarmView>
    ) {}

    async upsert(
        alarm: Pick<AlarmReadModel, 'id'> & Partial<AlarmReadModel>
    ): Promise<void> {
        await this.alarmModel.findOneAndUpdate({id: alarm.id}, alarm, {
            upsert: true
        })
    }
}
