import { Request, Response } from "express";
import { Event } from "../../entities/Event";
import { EditEventService } from "../../services/Event/Edit";

export class EditEventController {
  async handle(req: Request, res: Response) {
    const editEventService = new EditEventService();

    const { id } = req.params as { id: string };

    const { cooldown, lvl_max, lvl_min, max_chars, min_chars, name } =
      req.body as Event;

    try {
      const { message, record, status } = await editEventService.execute({
        cooldown,
        lvl_max,
        lvl_min,
        id,
        max_chars,
        min_chars,
        name,
      });
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
