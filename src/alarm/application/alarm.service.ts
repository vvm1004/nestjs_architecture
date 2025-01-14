import { Injectable } from '@nestjs/common';
import { CreateAlarmDto } from '../presenters/http/dto/create-alarm.dto';
import { UpdateAlarmDto } from '../presenters/http/dto/update-alarm.dto';
import { CreateAlarmCommand } from './commands/create-alarm-command';
// import { AlarmRepository } from './ports/create-alarm.reposity';
import { AlarmFactory } from '../domain/factories/alarm.factory';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './queries/get-alarms.query';

@Injectable()
export class AlarmService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}
  create(createAlarmCommand: CreateAlarmCommand) {

    return this.commandBus.execute(createAlarmCommand)
  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery())
  }

}
