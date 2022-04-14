import { getCustomRepository } from "typeorm";

import { UserRepository } from "../../repositories/UserRepository";
import { sendForgotPassword } from "../../utils/sendgrid";

export class ForgotPasswordUserService {
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

  async execute(email: string) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findOneOrFail({ email });

      const token = this.generateConfirmationToken();

      await userRepository.update({ email }, { token });

      await sendForgotPassword({
        email: user.email,
        name: user.name,
        token,
      });

      return {
        status: 200,
        message: "User ForgotPassword with success",
        record: token,
      };
    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    }
  }
}
