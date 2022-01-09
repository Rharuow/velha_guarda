import { Request, Response } from "express";
import { InsertCharMeetService } from "../../services/Meet/InsertChar";

export class InsertCharMeetController {
  async handle(req: Request, res: Response) {
    const insertCharMeetService = new InsertCharMeetService();

    const { char_id } = req.body as {
      char_id: string;
    };

    const { meet_id } = req.params as { meet_id: string };

    try {
      const { message, record, status } = await insertCharMeetService.execute(
        meet_id,
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
