import { getCustomRepository } from "typeorm";
import bcrypt from "bcryptjs";

import { UserRepository } from "../../repositories/UserRepository";

export class CreateSessionService {
  async execute(email: string, password: string) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findOne({
        where: { email },
        relations: ['chars']
      });

      if (!user?.is_active) throw new Error("User not registred");

      const password_decoded = await bcrypt.compare(password, user.password);
      if (!password_decoded) throw new Error("Invalid password");

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        is_admin: user.is_admin,
      };
    } catch (error) {
      console.log("Create Session Service = ", error.message);
      throw new Error(error.message);
    }
  }
}
