import { hash } from "bcryptjs";
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

      const passwordHashed = await hash(
        password,
        parseInt(process.env.HASH_SALTS)
      );

      const today = new Date();

      const userUpdated = await userRepository.update(user.id, { password: passwordHashed, token: `${today}` })

      console.log(userUpdated)

      return {
        status: 200,
        message: 'User ChangePassword with success',
        record: user,
      };
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
