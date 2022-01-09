import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
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

  @Column({ nullable: true })
  finished_at: Date;

  @Column()
  location: string;

  @Column({ default: true })
  avalible: boolean;

  @Column()
  event_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToMany(() => Char, (char) => char.meetings, { onDelete: "CASCADE" })
  chars: Array<Char>;

  @JoinColumn({ name: "event_id" })
  @ManyToOne((type) => Event, (event) => event.meetings, {
    onDelete: "CASCADE",
  })
  event: Event;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
