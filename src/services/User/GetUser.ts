import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { userWithCharsSerializer } from "../../serializers/User";

export class GetUserService {
  async execute(id: string) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findOneOrFail(id, {
        relations: ["chars"],
      });

      return {
        status: 200,
        message: "Get user with sucess",
        record: userWithCharsSerializer(user, user.chars).user,
      };
    } catch (error) {
      console.log("Error Get User Service = ", error.message);
      throw new Error(`Get User Service = ${error.message}`);
    }
  }
}
