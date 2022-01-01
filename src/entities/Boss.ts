import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { MeetBossChar } from "./BossesToChars";

@Entity("bosses")
export class Boss {
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

  @OneToMany(() => MeetBossChar, (meet) => meet.boss)
  bossToChars!: Array<MeetBossChar>;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
