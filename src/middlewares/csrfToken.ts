import { NextFunction, Request, Response } from "express";

export async function csrfToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { csrf } = req.headers as { csrf: string };

  if (!csrf || !csrf.includes(process.env.SECRET))
    return res.status(401).json({
      message: "There ins't csrf",
    });

  return next();
}
