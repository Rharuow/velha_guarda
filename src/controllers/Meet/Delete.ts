import { Request, Response } from "express";
import { DeleteMeetService } from "../../services/Meet/Delete";

export class DeleteMeetController {
  async handle(req: Request, res: Response) {
    const deleteMeetService = new DeleteMeetService();

    const { id } = req.params as { id: string };

    try {
      const { message, record, status } = await deleteMeetService.execute(id);

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
