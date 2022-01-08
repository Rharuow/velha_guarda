import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Char } from "./Char";
import { Meet } from "./Meet";
import { User } from "./User";

@Entity("events")
export class Event {
  @PrimaryColumn({
    unique: true,
  })
  readonly id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column()
  cooldown: number;

  @Column()
  lvl_min: number;

  @Column()
  lvl_max: number;

  @Column()
  min_chars: number;

  @Column()
  max_chars: number;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany((type) => Meet, (meet) => meet.event, { onDelete: "CASCADE" })
  meetings: Array<Meet>;

  @JoinColumn({ name: "user_id" })
  @ManyToOne((type) => User, (user) => user.events, { onDelete: "CASCADE" })
  user: User;

  @ManyToMany((type) => Char, (char) => char.events, { onDelete: "CASCADE" })
  chars: Array<Char>;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
