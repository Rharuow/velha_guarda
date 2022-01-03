import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";

import { UserRepository } from "../../repositories/UserRepository";
import { Session } from "../../types/Session";

export class GetUserByTokenService {
  async execute(token: string) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const { user } = jwt.verify(
        token.split(" ")[1],
        process.env.SECRET
      ) as Session;

      const currentUser = await userRepository.findOneOrFail(user.id, {
        relations: ["chars"],
      });

      return {
        status: 200,
        message: "User was showed with success",
        record: currentUser,
      };
    } catch (error) {
      console.log("Get user by token service");
      throw new Error(`Get user by token service ${error.message}`);
    }
  }
}
