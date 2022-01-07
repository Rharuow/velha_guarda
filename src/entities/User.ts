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

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
