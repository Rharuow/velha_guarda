import { CharSex, CharVoc } from "../entities/Char";
import { User } from "../entities/User";

export type CreateChar = {
  name: string;
  lvl: number;
  max_shared_lvl: number;
  min_shared_lvl: number;
  online: boolean;
  premium: boolean;
  residence: string;
  sex: CharSex;
  voc: CharVoc;
  user_id: string;
  user: User;
};
