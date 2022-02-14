import { Request, Response } from "express";
import { ListMeetService } from "../../services/Meet/List";

export class ListMeetController {
  async handle(req: Request, res: Response) {
    const listMeetService = new ListMeetService();

    const { page } = req.query as { page: string | undefined };

    console.log(page);

    try {
      const { message, record, status } = await listMeetService.execute(
        page ? parseInt(page) : 1
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
