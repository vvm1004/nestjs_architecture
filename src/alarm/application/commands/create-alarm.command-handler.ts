import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CreateAlarmCommand } from "./create-alarm-command";
import { Logger } from "@nestjs/common";
// import { AlarmRepository } from "../ports/create-alarm.reposity";
import { AlarmFactory } from "src/alarm/domain/factories/alarm.factory";
import { AlarmCreatedEvent } from "src/alarm/domain/events/alarm-created.event";
import { CreateAlarmRepository } from "../ports/create-alarm.reposity";

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler implements ICommandHandler<CreateAlarmCommand>{
    private readonly logger = new Logger(CreateAlarmCommandHandler.name);

    constructor(
        private readonly alarmRepository: CreateAlarmRepository,
        private readonly alarmFactory: AlarmFactory,
        private readonly eventBus: EventBus
    ){}

    async execute(command: CreateAlarmCommand){
        this.logger.debug(
            `Processing "CreateAlarmCommand": ${JSON.stringify(command)}`
        );
        const alarm = this.alarmFactory.create(command.name, command.severity, command.triggeredAt, command.items);
        const newAlarm = await this.alarmRepository.save(alarm);
        this.eventBus.publish(new AlarmCreatedEvent(alarm))

        return newAlarm

    }
}