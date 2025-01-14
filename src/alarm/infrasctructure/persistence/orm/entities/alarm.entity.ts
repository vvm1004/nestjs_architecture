import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { AlarmItemEntity } from "./alarm-item.entity";

@Entity('alarm')
export class AlarmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    severity: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    triggeredAt: Date;

    @Column()
    isAcknowledge: boolean;

    @OneToMany(() => AlarmItemEntity, (item) => item.alarm, {cascade: true})
    items: AlarmItemEntity[];
}