import { hash } from "bcryptjs";
import _ from "lodash";
import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { userWithCharsSerializer } from "../../serializers/User";
import { CreateUser } from "../../types/User";
import { sendConfirmationToken } from "../../utils/sendgrid";
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
    chars,
    email,
    is_admin,
    is_active,
    password,
  }: CreateUser) {
    const userRepository = getCustomRepository(UserRepository);
    const charRepository = getCustomRepository(CharRepository);

    const createCharService = new CreateCharService();

    const token = this.generateConfirmationToken();

    const passwordHashed = await hash(
      password,
      parseInt(process.env.HASH_SALTS)
    );

    try {
      const validadeChars = chars.filter(
        (char, index, self) =>
          index === self.findIndex((c) => c.name === char.name)
      );

      if (validadeChars.length < chars.length)
        throw new Error("Duplicate Chars");

      const hasUser = await userRepository.userExists({ name, email });

      let hasChar = { message: "", status: false };

      for (const char of chars)
        hasChar = await charRepository.charExists(char.name);

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

      for (const char of chars)
        await createCharService.execute({ ...char, user_id: user.id });

      await sendConfirmationToken({
        email: user.email,
        name: user.name,
        token,
      });

      return {
        status: 200,
        message: "User created with success",
        record: userWithCharsSerializer(user, chars),
      };
    } catch (error) {
      console.log(`create user service > ${error.message}`);
      throw new Error(`${error.message}`);
    }
  }
}
