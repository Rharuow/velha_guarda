import { getCustomRepository } from "typeorm";

import { CharRepository } from "../../repositories/CharRepository";
export class GetCharService {
  async execute(char_id: string) {
    const charRepository = getCustomRepository(CharRepository);

    try {
      const char = await charRepository.findOneOrFail(char_id);

      return {
        status: 200,
        message: "Char was Get with success",
        record: char,
      };
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
