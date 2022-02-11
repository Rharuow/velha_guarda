import { getCustomRepository } from "typeorm";
import { Char, CharSex } from "../../entities/Char";

import { CharRepository } from "../../repositories/CharRepository";

export interface UpdateCharParams {
  id: string;
  name: string;
  lvl: number;
  online: boolean;
  premium: boolean;
  residence: string;
  max_shared_lvl: number;
  min_shared_lvl: number;
  sex: CharSex;
}

export class UpdateCharService {
  async execute({
    id,
    lvl,
    name,
    online,
    premium,
    residence,
    sex,
    max_shared_lvl,
    min_shared_lvl,
  }: UpdateCharParams) {
    const charRepository = getCustomRepository(CharRepository);

    try {
      const charUpdated = await charRepository.update(id, {
        lvl,
        max_shared_lvl,
        min_shared_lvl,
        name,
        online,
        premium,
        residence,
        sex,
      });
      return {
        status: 200,
        message: "Char was Update with success",
        record: charUpdated,
      };
    } catch (error) {
      console.log(`Char was Update = ${error.message}`);
      throw new Error(`Char was Update = ${error.message}`);
    }
  }
}
