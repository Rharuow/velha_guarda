import { getCustomRepository } from "typeorm";

import { UserRepository } from "../../repositories/UserRepository";
export class ConfirmationUserService {
  async execute(email: string) {
    const userRepository = getCustomRepository(UserRepository);

    const today = new Date();

    try {
      const user = await userRepository.update(
        { email },
        {
          is_active: true,
          token: `${today}`,
        }
      );

      return {
        status: 200,
        message: "User was Confirmated with success",
        record: user,
      };
    } catch (error) {
      console.log(` confirmation user service = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
