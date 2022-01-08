import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Event } from "../../types/Event";
import { CreateEventService } from "../../services/Event/Create";
import { Session } from "../../types/Session";

export class CreateEventController {
  async handle(req: Request, res: Response) {
    const createEventService = new CreateEventService();

    const { coldown, lvl_max, lvl_min, max_chars, min_chars, name } =
      req.body as Event;

    const token: string = req.headers.authorization;

    const { user } = jwt.verify(
      token.split(" ")[1],
      process.env.SECRET
    ) as Session;

    try {
      const { message, record, status } = await createEventService.execute({
        coldown,
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
