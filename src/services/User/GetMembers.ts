import { getCustomRepository, Not } from "typeorm";

import { UserRepository } from "../../repositories/UserRepository";
import { usersWithCharsSerializer } from "../../serializers/User";
import { GetUserByTokenService } from "../Session/GetUserByToken";

export class GetMembersUserService {
  async execute(token: string) {
    const userRepository = getCustomRepository(UserRepository);
    const getUserByTokenService = new GetUserByTokenService();

    try {
      const currentUser = await getUserByTokenService.execute(token);

      const users = await userRepository.find({
        where: { id: Not(currentUser.record.id) },
        relations: ["chars"],
      });

      return {
        status: 200,
        message: "User was GetMembers with success",
        record: usersWithCharsSerializer(users),
      };
    } catch (error) {
      console.log(` Get Members User Service = ${error.message}`);
      throw new Error(` Get Members User Service = ${error.message}`);
    }
  }
}
