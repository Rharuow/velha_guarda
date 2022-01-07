import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Char } from "./Char";
import { Event } from "./Event";

@Entity("meetings")
export class Meet {
  @PrimaryColumn({
    unique: true,
  })
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

  @ManyToOne((type) => Char, (char) => char.meetings, { onDelete: "CASCADE" })
  char: Char;

  @ManyToOne((type) => Event, (event) => event.meetings, {
    onDelete: "CASCADE",
  })
  @JoinTable()
  event: Event;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
