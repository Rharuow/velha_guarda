import { Request, Response } from "express";
import { GetCharService } from "../../services/Char/Get";

export class GetCharController {
  async handle(req: Request, res: Response) {
    const getCharService = new GetCharService();

    const { char_id } = req.params as { char_id: string };

    try {
      const { message, record, status } = await getCharService.execute(char_id);

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
