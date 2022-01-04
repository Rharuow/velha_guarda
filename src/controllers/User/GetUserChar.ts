import { Request, Response } from "express";
import { GetUserCharService } from "../../services/User/GetUserChar";

export class GetUserCharController {
  async handle(req: Request, res: Response) {
    const getUserCharService = new GetUserCharService();

    const { user_id, char_id } = req.params as {
      user_id: string;
      char_id: string;
    };

    try {
      const { message, record, status } = await getUserCharService.execute(
        user_id,
        char_id
      );

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
