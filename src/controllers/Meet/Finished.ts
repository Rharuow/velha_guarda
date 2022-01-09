import { Request, Response } from "express";
import { FinishedMeetService } from "../../services/Meet/Finished";

export class FinishedMeetController {
  async handle(req: Request, res: Response) {
    const finishedMeetService = new FinishedMeetService();

    const { id } = req.body as { id: string };

    try {
      const { message, record, status } = await finishedMeetService.execute(id);

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
