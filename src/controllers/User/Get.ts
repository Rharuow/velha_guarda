import { Request, Response } from "express";
import { GetUserService } from "../../services/User/GetUser";

export class GetUserController {
  async handle(req: Request, res: Response) {
    const getUserService = new GetUserService();

    const { email } = req.params as { email: string };

    try {
      const { status, message, record } = await getUserService.execute(
        email,
        req.originalUrl.includes("chars"),
        req.originalUrl.includes("events")
      );

      return res.status(status).json({
        message,
        record,
      });
    } catch (error) {
      return res.status(500).json({
        message: `get user controller = ${error.message}`,
      });
    }
  }
}
