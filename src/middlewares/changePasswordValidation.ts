import { NextFunction, Request, Response } from "express";
import _ from "lodash";

export async function changePasswordValidation(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, token, password, password_confirmation } = req.body;

  if (
    !email ||
    !token ||
    !password ||
    !password_confirmation ||
    password !== password_confirmation
  ) return res.status(401).json({ message: "Validantion failed" })

  return next();
}
