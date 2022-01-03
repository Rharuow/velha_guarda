import { Request, Response, Router } from "express";
import { CreateUserController } from "./controlers/User/Create";
import { DeleteUserController } from "./controlers/User/Delete";
import { csrfToken } from "./middlewares/csrfToken";

const router = Router();

// user controllers
const createUserController = new CreateUserController();
const deleteUserCOntroller = new DeleteUserController();

router.get("/", (req: Request, res: Response) =>
  res.send(
    `Welcome to velha guarda api ${process.env.HOST}:${process.env.PORT}`
  )
);

router.post("/users", csrfToken, createUserController.handle);
router.delete("/users/:email", csrfToken, deleteUserCOntroller.handle);

export default router;
