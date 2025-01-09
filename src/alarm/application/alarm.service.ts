import { Injectable } from '@nestjs/common';
import { CreateAlarmDto } from '../presenters/http/dto/create-alarm.dto';
import { UpdateAlarmDto } from '../presenters/http/dto/update-alarm.dto';
import { CreateAlarmCommand } from './commands/create-alarm-command';
import { AlarmRepository } from './ports/alarm.reposity';
import { AlarmFactory } from '../domain/factories/alarm.factory';

@Injectable()
export class AlarmService {
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory
  ) {}
  create(createAlarmCommand: CreateAlarmCommand) {
    const alarm = this.alarmFactory.create(
      createAlarmCommand.name,
      createAlarmCommand.severity
    )

    return this.alarmRepository.save(alarm)
  }

  findAll() {
    return this.alarmRepository.findAll()
  }

}
