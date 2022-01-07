import { getCustomRepository } from "typeorm";
import { Char } from "../entities/Char";
import { CharRepository } from "../repositories/CharRepository";
import { UserRepository } from "../repositories/UserRepository";

const userWithCharsSerializer = async (user_id: string, char_id: string) => {
  const charRepository = getCustomRepository(CharRepository);
  const userRepository = getCustomRepository(UserRepository);
  try {
    const user = await userRepository.findOneOrFail(user_id);
    const char = await charRepository.findOneOrFail(char_id);

    return {
      user: {
        id: user.id,
        is_active: user.is_active,
        is_admin: user.is_admin,
        name: user.name,
        email: user.email,
        char: char,
      } as {
        id: string;
        is_active: boolean;
        is_admin: boolean;
        name: string;
        email: string;
        char: Char;
      },
    };
  } catch (error) {
    console.log("Serializer error = ", error.message);
    throw new Error(` ${error.message}`);
  }
};

export { userWithCharsSerializer };
