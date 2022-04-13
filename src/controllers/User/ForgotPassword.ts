import { Request, Response } from 'express';
import { ForgotPasswordUserService } from '../../services/User/ForgotPassword'

export class ForgotPasswordUserController {
  async handle(req: Request, res: Response) {
    const forgotPasswordUserService = new ForgotPasswordUserService()

    const { email } = req.params as { email: string }

    try {

      const { message, record, status } = await forgotPasswordUserService.execute(email)

      return res.status(status).json({
        message,
        record,
      });
    } catch (error) {
      return res.status(500).json({
        message: `${error.message}`,
      });
    }
  }
}