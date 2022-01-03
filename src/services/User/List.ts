import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";

export class ListUserService {
  async execute() {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const users = await userRepository.find();

      if (users.length <= 0)
        return {
          status: 400,
          message: "There's not users",
          record: {},
        };

      return {
        status: 200,
        message: "User was listed with success",
        record: users,
      };
    } catch (error) {
      console.log("List user service");
      throw new Error(`List user service ${error.message}`);
    }
  }
}
