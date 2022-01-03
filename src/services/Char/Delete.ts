import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";
import { GetUserService } from "../User/GetUser";

export class DeleteCharService {
  async execute(user_id: string) {
    const charRepository = getCustomRepository(CharRepository);
    const getUserService = new GetUserService();

    try {
      const { record } = await getUserService.execute(user_id);

      const chars = await charRepository.find({ user: record });

      if (!chars || chars.length <= 0)
        return {
          status: 400,
          message: "There isn't users",
          record: {},
        };

      await charRepository.delete({ user: record });

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
