import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { CreateUser } from "../../types/User";
import { CreateCharService } from "../Char/Create";

export class CreateUserService {
  private generateConfirmationToken(): string {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < 28; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async execute({ name, chars, email, is_admin, password }: CreateUser) {
    const userRepository = getCustomRepository(UserRepository);

    const createCharService = new CreateCharService();

    const token = this.generateConfirmationToken();

    try {
      const user = userRepository.create({
        name,
        email,
        is_admin,
        token,
        password,
      });

      chars.forEach(async (char) => {
        await createCharService.execute(char);
      });

      await userRepository.save(user);

      return {
        status: 200,
        message: "User created with success",
        record: user,
      };
    } catch (error) {
      console.log("create user service");
      throw new Error(error.message);
    }
  }
}
