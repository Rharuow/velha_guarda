import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";

export class ListCharService {
  async execute() {
    const charRepository = getCustomRepository(CharRepository);

    try {
      const chars = await charRepository.find();

      return {
        status: 200,
        chars,
      };
    } catch (error) {
      return {
        status: 401,
        message: error.message,
        where: "create user service",
      };
    }
  }
}
