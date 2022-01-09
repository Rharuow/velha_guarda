import { NextFunction, Request, Response } from "express";

export async function isAvalibleDate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { start_at } = req.body as { start_at: string };

  const startAt = new Date(start_at);
  const today = new Date();

  if (startAt > today) return next();

  return res.status(401).json({
    message: "Not avalible date",
  });
}
