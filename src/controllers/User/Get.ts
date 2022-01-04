import { Request, Response } from "express";
import { GetUserService } from "../../services/User/GetUser";

export class GetUserController {
  async handle(req: Request, res: Response) {
    const getUserService = new GetUserService();

    const { id } = req.params as { id: string };

    try {
      const { status, message, record } = await getUserService.execute(id);

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
