import { Request, Response } from "express";
import { InsertCharMeetService } from "../../services/Meet/InsertChar";

export class InsertCharMeetController {
  async handle(req: Request, res: Response) {
    const insertCharMeetService = new InsertCharMeetService();

    const { id, char_id } = req.params as { id: string; char_id: string };

    try {
      const { message, record, status } = await insertCharMeetService.execute(
        id,
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
