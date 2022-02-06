import { Request, Response } from "express";
import { EventsCharService } from "../../services/Char/Events";

export class EventsCharController {
  async handle(req: Request, res: Response) {
    const eventsCharService = new EventsCharService();

    const { id } = req.params as { id: string };

    try {
      const { message, record, status } = await eventsCharService.execute(id);

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
