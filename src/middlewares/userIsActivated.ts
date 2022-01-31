import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export async function userIsActivated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userRepository = getCustomRepository(UserRepository);

  const { email, password } = req.body as { email: string; password: string };

  try {
    const user = await userRepository.findOneOrFail({ email });

    const passwordDecoded = await bcrypt.compare(password, user.password);
    if (!passwordDecoded) throw new Error("Invalid password");

    if (!user.is_active) throw new Error("User unauthorized");

    return next();
  } catch (error) {
    console.log("middleware user is activated = ", error.message);
    return res.status(401).json({
      message: `${error.message}`,
    });
  }
}
