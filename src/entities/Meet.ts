import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column()
  char_id: string;

  @Column()
  event_id: string;

  @Column()
  amount_chars: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: "char_id" })
  @ManyToOne((type) => Char, (char) => char.meetings, { onDelete: "CASCADE" })
  char: Char;

  @JoinColumn({ name: "event_id" })
  @ManyToOne((type) => Event, (event) => event.meetings, {
    onDelete: "CASCADE",
  })
  event: Event;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
