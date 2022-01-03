import { Request, Response } from "express";
import { ListCharService } from "../../services/Char/List";

export class ListCharsController {
  async handle(req: Request, res: Response) {
    const listCharService = new ListCharService();

    try {
      const { record, status, message } = await listCharService.execute();

      return res.status(status).json({
        message,
        record,
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
}
