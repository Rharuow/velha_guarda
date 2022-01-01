import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  res.send(`Welcome to velha guarda api ${process.env.NODE_ENV}`)
);

export default router;
