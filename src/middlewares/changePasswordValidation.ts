import { NextFunction, Request, Response } from "express";
import _ from "lodash";

export async function changePasswordValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, token, password, password_confirmation } = req.body;

  const { record } = await listCharService.execute();

  return res.status(401).json({
    message: "Validation fields failed",
  });
}
