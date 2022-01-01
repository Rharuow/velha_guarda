import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { QuestsToChars } from "./QuestsToChars";

@Entity("quests")
export class Quest {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

  @Column()
  lvl_required: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => QuestsToChars, (questsToChars) => questsToChars.quest)
  questToChars: Array<QuestsToChars>;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
