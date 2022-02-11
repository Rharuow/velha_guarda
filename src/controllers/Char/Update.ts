import { Request, Response } from "express";
import {
  UpdateCharParams,
  UpdateCharService,
} from "../../services/Char/Update";

export class UpdateCharController {
  async handle(req: Request, res: Response) {
    const updateCharService = new UpdateCharService();

    const { id } = req.params as { id: string };

    const {
      lvl,
      max_shared_lvl,
      min_shared_lvl,
      name,
      online,
      premium,
      residence,
      sex,
    } = req.body as UpdateCharParams;

    try {
      const { message, record, status } = await updateCharService.execute({
        id,
        lvl,
        max_shared_lvl,
        min_shared_lvl,
        name,
        online,
        premium,
        sex,
        residence,
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
