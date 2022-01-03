import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export interface IUserSession {
  user: { email: string; id: string };
  iat: number;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "There isn't token" });

  const { user } = jwt.verify(
    token.split(" ")[1],
    process.env.SECRET
  ) as IUserSession;

  const userRepository = getCustomRepository(UserRepository);

  const isUser = await userRepository.findOne(user.id);

  if (!isUser) return res.status(401).json({ message: "Unauthorized" });

  req.headers.decodedSessionUserId = user.id;

  return next();
}
