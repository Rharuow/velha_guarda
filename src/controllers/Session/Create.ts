import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CreateSessionService } from "../../services/Session/Create";

export class CreateSessionController {
  async handle(req: Request, res: Response) {
    const createSessionService = new CreateSessionService();

    try {
      const user = await createSessionService.execute(
        req.body.email,
        req.body.password
      );

      const token = jwt.sign(
        {
          user: {
            email: user.email,
            id: user.id,
            name: user.name,
            is_admin: user.is_admin,
          },
        },
        process.env.SECRET
      );

      console.log("Session done");

      return res.json({ token });
    } catch (error) {
      console.log("error session request = ", error.message);
      return res.status(401).json({ message: error.message });
    }
  }
}
