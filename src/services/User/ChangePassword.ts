import { getCustomRepository } from "typeorm";
import { UserRepository } from "../../repositories/UserRepository";

export type ChangePassword = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};

export class ChangePasswordUserService {
  async execute({
    email,
    password,
    password_confirmation,
    token,
  }: ChangePassword) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findOneOrFail({
        where: { email, token },
      });
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
