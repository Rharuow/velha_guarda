import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Char } from "./Char";
import { Event } from "./Event";

@Entity("meetings")
export class Meet {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  start_at: Date;

  @Column()
  location: string;

  @Column()
  hours: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  char_id: string;

  @Column()
  event_id: string;

  @ManyToOne(() => Char, (char) => char.meetings, { onDelete: "CASCADE" })
  char: Char;

  @ManyToOne(() => Event, (event) => event.meetings, { onDelete: "CASCADE" })
  event: Event;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
