import { Request, Response } from "express";
import { CharSex, CharVoc } from "../../entities/Char";
import { CreateCharService } from "../../services/Char/Create";
import { CreateChar } from "../../types/Char";

export class CreateCharController {
  async handle(req: Request, res: Response) {
    const createCharService = new CreateCharService();

    const data = req.body as CreateChar & {
      token: string;
      email: string;
      confirmation?: boolean;
    };

    try {
      const { message, record, status } = await createCharService.execute(data);
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
