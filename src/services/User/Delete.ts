import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { userSerializer } from "../../serializers/User";
import { DeleteCharService } from "../Char/Delete";

export class DeleteUserService {
  async execute(email: string) {
    const userRepository = getCustomRepository(UserRepository);
    const deleteCharService = new DeleteCharService();

    try {
      const user = await userRepository.findOne({ email });

      if (!user)
        return {
          status: 400,
          message: "User doens't exists",
          record: {},
        };

      await userRepository.delete(user.id);

      // await deleteCharService.execute(user.id);

      return {
        status: 200,
        message: "User was deleted with success",
        record: userSerializer(user),
      };
    } catch (error) {
      console.log("Delete user service");
      throw new Error(`Delete user service ${error.message}`);
    }
  }
}
