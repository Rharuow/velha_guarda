import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";
import { CreateChar } from "../../types/Char";

export class CreateCharService {
  async execute({
    name,
    lvl,
    max_shared_lvl,
    min_shared_lvl,
    online,
    premium,
    residence,
    sex,
    voc,
    user_id,
  }: CreateChar) {
    const charRepository = getCustomRepository(CharRepository);

    try {
      const char = charRepository.create({
        name,
        lvl,
        max_shared_lvl,
        min_shared_lvl,
        online,
        premium,
        residence,
        sex,
        voc,
        user_id,
      });

      await charRepository.save(char);

      console.log("Char created with success");

      return {
        status: 200,
        message: "Char created with success",
        record: char,
      };
    } catch (error) {
      console.log("Error create char service = ", error.message);
      throw new Error(`create char service ${error.message}`);
    }
  }
}
