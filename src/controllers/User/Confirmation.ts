import { Request, Response } from "express";
import { ConfirmationUserService } from "../../services/User/Confirmation";

export class ConfirmationUserController {
  async handle(req: Request, res: Response) {
    const confirmationUserService = new ConfirmationUserService();

    const { email } = req.params as { email: string };

    try {
      const { message, record, status } = await confirmationUserService.execute(
        email
      );
      return res.status(status).json({
        message,
        record,
      });
    } catch (error) {
      return res.status(500).json({
        message: ` Confirmation User Controller =  ${error.message}`,
      });
    }
  }
}
