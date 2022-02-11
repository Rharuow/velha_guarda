import { Request, Response } from "express";
import { DeleteEventService } from "../../services/Event/Delete";

export class DeleteEventController {
  async handle(req: Request, res: Response) {
    const deleteEventService = new DeleteEventService();

    const { id } = req.params as { id: string };

    try {
      const { message, record, status } = await deleteEventService.execute(id);
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
