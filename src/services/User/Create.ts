import { hash } from "bcryptjs";
import _ from "lodash";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";
import { CreateUser } from "../../types/User";
import { sendConfirmationToken } from "../../utils/sendgrid";

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

  async execute({ name, email, is_admin, is_active, password }: CreateUser) {
    const userRepository = getCustomRepository(UserRepository);

    const token = this.generateConfirmationToken();

    const passwordHashed = await hash(
      password,
      parseInt(process.env.HASH_SALTS)
    );

    try {
      const hasUser = await userRepository.userExists({ name, email });

      let hasChar = { message: "", status: false };

      if (hasUser.status || hasChar.status)
        throw new Error(hasUser.status ? hasUser.message : hasChar.message);

      const user = userRepository.create({
        name,
        email,
        is_admin,
        token,
        is_active,
        password: passwordHashed,
      });

      await userRepository.save(user);
      console.log("User created with success");

      await sendConfirmationToken({
        email: user.email,
        name: user.name,
        token,
      });

      return {
        status: 200,
        message: "User created with success",
        record: user,
      };
    } catch (error) {
      console.log(`create user service > ${error.message}`);
      throw new Error(`${error.message}`);
    }
  }
}
