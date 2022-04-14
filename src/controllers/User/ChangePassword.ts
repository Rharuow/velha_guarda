import { Request, Response } from 'express';
import { ChangePassword, ChangePasswordUserService } from '../../services/User/ChangePassword'

export class ChangePasswordUserController {
  async handle(req: Request, res: Response) {
    const changePasswordUserService = new ChangePasswordUserService()

    const { email, password, password_confirmation, token } = req.body as ChangePassword

    try {
      const { message, record, status } = await changePasswordUserService.execute({ email, password, password_confirmation, token })

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