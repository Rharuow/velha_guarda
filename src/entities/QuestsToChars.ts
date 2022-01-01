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
import { Char } from "./Char";
import { Quest } from "./Quest";

Entity("quests_to_chars");
export class QuestsToChars {
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
  quest_id: string;

  @Column()
  char_id: string;

  @ManyToOne(() => Quest, (quest) => quest.questToChars)
  quest: Quest;

  @ManyToOne(() => Char, (char) => char.charToQuests)
  char: Char;

  constructor() {
    if (!this.id) this.id = uuid();
  }
}
