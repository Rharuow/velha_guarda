import { Request, Response } from "express";
import { DeleteUserService } from "../../services/User/Delete";

export class DeleteUserController {
  async handle(req: Request, res: Response) {
    const deleteUserService = new DeleteUserService();

    const { email } = req.params as { email: string };

    try {
      const { status, message, record } = await deleteUserService.execute(
        email
      );

      return res.status(status).json({
        message,
        record,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        where: "delete user controller",
      });
    }
  }
}
