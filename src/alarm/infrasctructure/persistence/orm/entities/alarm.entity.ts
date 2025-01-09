import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('alarm')
export class AlarmEntity {
    @PrimaryColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    severity: string;
}