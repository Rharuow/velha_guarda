import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Meet } from "./Meet";
import { User } from "./User";

export enum CharSex {
  m = "m",
  f = "f",
}

export enum CharVoc {
  ed = "ed",
  rp = "rp",
  ek = "ek",
  ms = "ms",
}

@Entity("chars")
export class Char {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  lvl: number;

  @Column({
    type: "enum",
    enum: CharSex,
  })
  sex: CharSex;

  @Column({
    type: "enum",
    enum: CharVoc,
  })
  voc: CharVoc;

  @Column()
  max_shared_lvl: number;

  @Column()
  min_shared_lvl: number;

  @Column()
  residence: string;

  @Column()
  premium: boolean;

  @Column()
  online: boolean;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: "user_id" })
  @ManyToOne(() => User, (user) => user.chars)
  user: User;

  @OneToMany(() => Meet, (meet) => meet.char)
  meetings: Array<Meet>;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
