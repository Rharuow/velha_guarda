import { Request, Response } from "express";
import { ListMeetService } from "../../services/Meet/List";
import { FiltersType } from "../../utils/filters";

export type QueryParams = {
  page: string | undefined;
  filters?: FiltersType | string;
};

export class ListMeetController {
  async handle(req: Request, res: Response) {
    const listMeetService = new ListMeetService();

    const { page, filters } = req.query as QueryParams;

    try {
      const { message, record, status } = await listMeetService.execute(
        page ? parseInt(page) : 1,
        filters
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
