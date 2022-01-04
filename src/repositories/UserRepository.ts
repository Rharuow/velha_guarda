import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Char } from "../entities/Char";
import { User } from "../entities/User";
import { CharRepository } from "./CharRepository";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findCharByUser(user_id: string, char_id: string) {
    const charRepository = getCustomRepository(CharRepository);

    try {
      const user = await this.findOneOrFail(user_id);

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
      console.log("");
      throw new Error(` ${error.message}`);
    }
  }
}
