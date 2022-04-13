import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs'

import { UserRepository } from '../../repositories/UserRepository';

export class ForgotPasswordUserService {
  async execute(email: string) {
    const userRepository = getCustomRepository(UserRepository);

    try {
      const user = await userRepository.findOneOrFail({ email })

      const token = await hash(user.token, parseInt(process.env.HASH_SALTS))

      await userRepository.update({ email }, { token })

      return {
        status: 200,
        message: 'User ForgotPassword with success',
        record: token,
      };

    } catch (error) {
      console.log(` = ${error.message}`);
      throw new Error(` = ${error.message}`);
    };
  }
}