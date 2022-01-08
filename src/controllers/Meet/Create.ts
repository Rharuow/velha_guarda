import { Request, Response } from "express";
import { CreateMeetService } from "../../services/Meet/Create";
import { CreateMeet } from "../../types/Meet";

export class CreateMeetController {
  async handle(req: Request, res: Response) {
    const createMeetService = new CreateMeetService();

    const createMeet = req.body as CreateMeet;

    try {
      const { message, record, status } = await createMeetService.execute(
        createMeet
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
