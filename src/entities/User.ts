import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Char } from "./Char";
import { Event } from "./Event";

@Entity("users")
export class User {
  @PrimaryColumn({
    unique: true,
  })
  readonly id: string;

  @Column({
    unique: true,
  })
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    unique: true,
  })
  token: string;

  @Column()
  is_active: boolean;

  @Column()
  is_admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: "chars" })
  @OneToMany((type) => Char, (char) => char.user, { onDelete: "CASCADE" })
  chars: Char[];

  @JoinColumn({ name: "users" })
  @OneToMany((type) => Event, (event) => event.user, { onDelete: "CASCADE" })
  events: Array<Event>;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
