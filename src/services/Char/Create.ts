import { getCustomRepository } from "typeorm";
import { CharRepository } from "../../repositories/CharRepository";
import { UserRepository } from "../../repositories/UserRepository";
import { CreateChar } from "../../types/Char";
import { ConfirmationUserService } from "../User/Confirmation";

export class CreateCharService {
  async execute({
    name,
    lvl,
    max_shared_lvl,
    min_shared_lvl,
    online,
    premium,
    residence,
    sex,
    voc,
    token,
    email,
    confirmation = false,
  }: CreateChar & { token: string; email: string; confirmation?: boolean }) {
    const charRepository = getCustomRepository(CharRepository);

    const userRepository = getCustomRepository(UserRepository);

    const confirmationUserService = new ConfirmationUserService();

    try {
      const user = await userRepository.findOneOrFail({
        where: { email, token },
      });

      if (confirmation) await confirmationUserService.execute(email);

      const char = charRepository.create({
        name,
        lvl,
        max_shared_lvl,
        min_shared_lvl,
        online,
        premium,
        residence,
        sex,
        voc,
        user_id: user.id,
      });

      await charRepository.save(char);

      console.log("Char created with success");

      return {
        status: 200,
        message: "Char created with success",
        record: char,
      };
    } catch (error) {
      console.log("Error create char service = ", error.message);
      throw new Error(`create char service ${error.message}`);
    }
  }
}
