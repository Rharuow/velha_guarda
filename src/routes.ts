import { Request, Response, Router } from "express";
import { CreateSessionController } from "./controlers/Session/Create";
import { CreateUserController } from "./controlers/User/Create";
import { DeleteUserController } from "./controlers/User/Delete";
import { ListUserController } from "./controlers/User/List";

const router = Router();

// user controllers
const createUserController = new CreateUserController();
const deleteUserCOntroller = new DeleteUserController();
const listUserController = new ListUserController();

// session controller
const createSessionController = new CreateSessionController();

router.get("/", (req: Request, res: Response) =>
  res.send(
    `Welcome to velha guarda api ${process.env.HOST}:${process.env.PORT}`
  )
);

// user resourcers
router.get("/users", listUserController.handle);
router.post("/users", createUserController.handle);
router.delete("/users/:email", deleteUserCOntroller.handle);

// session resourcers
router.post("/session", createSessionController.handle);

export default router;
