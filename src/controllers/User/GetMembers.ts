import { Request, Response } from "express";
import { GetMembersUserService } from "../../services/User/GetMembers";

export class GetMembersUserController {
  async handle(req: Request, res: Response) {
    const getMembersUserService = new GetMembersUserService();

    const token: string = req.headers.authorization;

    try {
      const { status, message, record } = await getMembersUserService.execute(
        token
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
