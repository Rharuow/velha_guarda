import { NextFunction, Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import jwt from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";
import { IUserSession } from "./ensureAuthenticated";
import { MeetRepository } from "../repositories/MeetRepository";

export async function userCharAlreadyRegistred(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userRepository = getCustomRepository(UserRepository);
  const meetRepository = getCustomRepository(MeetRepository);

  const { char_id } = req.body as { char_id: string };

  const { meet_id } = req.params as { meet_id: string };

  const token: string = req.headers.authorization;

  const { user } = jwt.verify(
    token.split(" ")[1],
    process.env.SECRET
  ) as IUserSession;

  const currentUser = await userRepository.findOne(user.id);
  const meet = await meetRepository.findOne(meet_id);

  const charMeetRegistred = meet.chars.find((char) => char.id === char_id);
  const charCurrentUser = currentUser.chars.find((char) => char.id === char_id);

  if (charMeetRegistred === charCurrentUser)
    return res.send("user's char already registred");

  return next();
}
