import { Request, Response } from "express";
import { CreateUserService } from "../../services/User/Create";
import { CreateUser } from "../../types/User";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserService = new CreateUserService();

    const user = req.body as CreateUser;

    try {
      const { status, message, record } = await createUserService.execute(user);

      return res.status(status).json({
        message,
        record,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
        where: "create user controller",
      });
    }
  }
}
