import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export async function tokenVerification(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, token } = req.params;

  const userRepository = getCustomRepository(UserRepository);

  try {
    await userRepository.findOneOrFail({ email, token });

    return next();
  } catch (error) {
    return res.status(401).json({
      message: "User doesn't exists",
    });
  }
}
