import { Request, Response } from "express";
import { GetMeetService } from "../../services/Meet/Get";

export class GetMeetController {
  async handle(req: Request, res: Response) {
    const getMeetService = new GetMeetService();

    const { id } = req.params as { id: string };

    try {
      const { message, record, status } = await getMeetService.execute(
        id,
        req.originalUrl.includes("event"),
        req.originalUrl.includes("chars")
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
