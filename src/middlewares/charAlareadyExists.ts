import { NextFunction, Request, Response } from "express";
import _ from "lodash";
import { ListCharService } from "../services/Char/List";

export async function charAlareadyExists(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { char } = req.body;

  const listCharService = new ListCharService();

  const { record } = await listCharService.execute();

  const charAlreadyExists = record.filter((ch) => ch.name === char.name);

  if (charAlreadyExists.length > 0) return next();

  return res.status(401).json({
    message: "Char not exists",
  });
}
