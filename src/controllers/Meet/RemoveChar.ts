import { Request, Response } from "express";
import { RemoveCharMeetService } from "../../services/Meet/RemoveChar";

export class RemoveCharMeetController {
  async handle(req: Request, res: Response) {
    const removeCharMeetService = new RemoveCharMeetService();

    const { id, char_id } = req.params as { id: string; char_id: string };

    try {
      const { message, record, status } = await removeCharMeetService.execute(
        id,
        char_id
      );

      return res.status(status).json({
        message,
        record,
      });
    } catch (error) {
      return res.status(500).json({
        message: ` > Remove Char Meet Controller > ${error.message}`,
      });
    }
  }
}
