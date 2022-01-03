import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";

export class DeleteCharService {
  async execute(user_id: string) {
    const charRepository = getCustomRepository(CharRepository);

    try {
      const chars = await charRepository.find({ user_id: user_id });

      if (!chars || chars.length <= 0)
        return {
          status: 400,
          message: "There isn't users",
          record: {},
        };

      await charRepository.delete({ user_id });

      return {
        status: 200,
        message: "User was deleted with success",
        record: chars,
      };
    } catch (error) {
      console.log("Delete user service");
      throw new Error(`Delete user service ${error.message}`);
    }
  }
}
