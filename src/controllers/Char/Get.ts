import { Request, Response } from "express";
import { charWithMeetings } from "../../serializers/Char";
import { GetCharService } from "../../services/Char/Get";

export class GetCharController {
  async handle(req: Request, res: Response) {
    const getCharService = new GetCharService();

    const { id } = req.params as { id: string };

    const withMeetings = req.originalUrl.includes("meetings");

    try {
      const { message, record, status } = await getCharService.execute(
        id,
        withMeetings
      );

      return res.status(status).json({
        message,
        record: withMeetings
          ? charWithMeetings(record, record.meetings)
          : record,
      });
    } catch (error) {
      return res.status(500).json({
        message: `${error.message}`,
      });
    }
  }
}
