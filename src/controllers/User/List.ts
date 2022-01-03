import { Request, Response } from "express";
import { ListUserService } from "../../services/User/List";

export class ListUserController {
  async handle(req: Request, res: Response) {
    const listUserService = new ListUserService();

    try {
      const { status, message, record } = await listUserService.execute();

      return res.status(status).json({
        message,
        record,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        where: "List user controller",
      });
    }
  }
}
