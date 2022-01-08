import { Request, Response } from "express";
import { GetEventService } from "../../services/Event/Get";

export class GetEventController {
  async handle(req: Request, res: Response) {
    const getEventService = new GetEventService();

    const { id } = req.params as { id: string };

    try {
      const { message, record, status } = await getEventService.execute(
        id,
        req.originalUrl.includes("meetings")
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
