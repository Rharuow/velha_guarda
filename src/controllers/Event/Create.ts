import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateEvent } from "../../types/Events";
import { CreateEventService } from "../../services/Event/Create";
import { Session } from "../../types/Session";

export class CreateEventController {
  async handle(req: Request, res: Response) {
    const createEventService = new CreateEventService();

    const { cooldown, lvl_max, lvl_min, max_chars, min_chars, name } =
      req.body as CreateEvent;

    const token: string = req.headers.authorization;

    const { user } = jwt.verify(
      token.split(" ")[1],
      process.env.SECRET
    ) as Session;

    try {
      const { message, record, status } = await createEventService.execute({
        cooldown,
        lvl_max: lvl_max ? lvl_max : 100000,
        lvl_min: lvl_min ? lvl_max : 1,
        max_chars: max_chars ? max_chars : 10000,
        min_chars: min_chars? min_chars : 1,
        name,
        user_id: user.id
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
