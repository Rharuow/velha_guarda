import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuid } from "uuid";
import { Boss } from "./Boss";
import { Char } from "./Char";

@Entity("bosses_to_chars")
export class MeetBossChar {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  start_at: Date;

  @Column()
  location: string;

  @Column()
  hours: string;

  @Column()
  max_char: number;

  @Column()
  min_char: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  bossId: string;

  @Column()
  charId: string;

  // @JoinColumn({ name: "boss_id" })
  @ManyToOne(() => Boss, (boss) => boss.bossToChars, {
    onDelete: "CASCADE",
  })
  boss: Boss;

  // @JoinColumn({ name: "char_id" })
  @ManyToOne(() => Char, (char) => char.charToBosses, { onDelete: "CASCADE" })
  char: Char;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
