import { Request, Response } from "express";
import { AvailableMeetService } from "../../services/Meet/Avaliable";

export class AvailableMeetController {
  async handle(req: Request, res: Response) {
    const availableMeetService = new AvailableMeetService();

    const { id } = req.params as { id: string };

    const { available } = req.body as { available: boolean };

    try {
      const { message, record, status } = await availableMeetService.execute(
        id,
        available
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
