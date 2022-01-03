import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";

export class DeleteUserService {
  async execute(email: string) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findOne({ email });

      if (!user)
        return {
          status: 400,
          message: "User doens't exists",
          record: {},
        };

      await userRepository.delete(user.id);

      return {
        status: 200,
        message: "User was deleted with success",
        record: user,
      };
    } catch (error) {
      console.log("Delete user service");
      throw new Error(`Delete user service ${error.message}`);
    }
  }
}
