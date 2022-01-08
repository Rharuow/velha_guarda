import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { userWithCharsSerializer } from "../../serializers/User";

export class GetUserService {
  async execute(email: string, withChars = false) {
    const userRepository = getCustomRepository(UserRepository);

    const queryParams = {
      where: { email },
    };

    if (withChars) queryParams["relations"] = ["chars"];

    try {
      const user = await userRepository.findOneOrFail(queryParams);

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
