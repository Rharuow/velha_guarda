import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";

export class GetUserCharService {
  async execute(user_id: string, char_id: string) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findCharByUser(user_id, char_id);

      return {
        status: 200,
        message: "User was showed with success",
        record: user,
      };
    } catch (error) {
      console.log("Get user char service");
      throw new Error(`Get user by token service ${error.message}`);
    }
  }
}
