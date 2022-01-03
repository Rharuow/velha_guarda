import { hash } from "bcryptjs";
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

  async execute({
    name,
    char,
    email,
    is_admin,
    is_active,
    password,
  }: CreateUser) {
    const userRepository = getCustomRepository(UserRepository);

    const createCharService = new CreateCharService();

    const token = this.generateConfirmationToken();

    const passwordHashed = await hash(
      password,
      parseInt(process.env.HASH_SALTS)
    );

    try {
      const user = userRepository.create({
        name,
        email,
        is_admin,
        token,
        is_active,
        password: passwordHashed,
      });

      await createCharService.execute({ ...char, user_id: user.id });

      await userRepository.save(user);
      console.log("User created with success");

      return {
        status: 200,
        message: "User created with success",
        record: user,
      };
    } catch (error) {
      console.log("create user service");
      throw new Error(`create user service ${error.message}`);
    }
  }
}
