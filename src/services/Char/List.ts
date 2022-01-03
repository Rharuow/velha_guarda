import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";

export class ListCharService {
  async execute() {
    const charRepository = getCustomRepository(CharRepository);

    try {
      const chars = await charRepository.find();

      return {
        status: 200,
        message: "Chars list with sucess",
        record: chars,
      };
    } catch (error) {
      throw new Error(`list char service ${error.message}`);
    }
  }
}
