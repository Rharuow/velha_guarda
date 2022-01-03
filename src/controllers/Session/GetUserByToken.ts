import { Request, Response } from "express";
import { GetUserByTokenService } from "../../services/User/GetUserByToken";

export class GetUserByTokenController {
  async handle(req: Request, res: Response) {
    const getUserByTokenService = new GetUserByTokenService();

    const token = req.headers.authorization;

    try {
      const { status, message, record } = await getUserByTokenService.execute(
        token
      );

      return res.status(status).json({
        message,
        record,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        where: "Get user by token controller",
      });
    }
  }
}
