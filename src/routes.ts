import { Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) =>
  res.send(`Welcome to version 2 node CAF API ${process.env.NODE_ENV}`)
);

export default router;
