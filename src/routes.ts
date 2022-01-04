import { Request, Response, Router } from "express";
import { ListCharsController } from "./controllers/Char/List";
import { CreateSessionController } from "./controllers/Session/Create";
import { CreateUserController } from "./controllers/User/Create";
import { DeleteUserController } from "./controllers/User/Delete";
import { GetUserByTokenController } from "./controllers/Session/GetUserByToken";
import { ListUserController } from "./controllers/User/List";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { GetUserController } from "./controllers/User/Get";
import { GetUserCharController } from "./controllers/User/GetUserChar";
import { GetCharController } from "./controllers/Char/Get";

const router = Router();
router.get("/", (req: Request, res: Response) =>
  res.send(
    `Welcome to velha guarda api ${process.env.HOST}:${process.env.PORT}`
  )
);

// user controllers
const createUserController = new CreateUserController();
const deleteUserCOntroller = new DeleteUserController();
const listUserController = new ListUserController();
const getUserController = new GetUserController();
const getUserCharController = new GetUserCharController();

// session controller
const createSessionController = new CreateSessionController();
const getUserByTokenController = new GetUserByTokenController();

//char controller

const listCharsController = new ListCharsController();
const getCharController = new GetCharController();

// user resourcers

router.get("/users", ensureAuthenticated, listUserController.handle);
router.post("/users", createUserController.handle);
router.delete(
  "/users/:email",
  ensureAuthenticated,
  deleteUserCOntroller.handle
);
router.get("/users/:id", ensureAuthenticated, getUserController.handle);
router.get(
  "/users/:user_id/chars/:char_id",
  ensureAuthenticated,
  getUserCharController.handle
);

// session resourcers
router.post("/session", createSessionController.handle);
router.get("/session", ensureAuthenticated, getUserByTokenController.handle);

// char resourcers
router.get("/chars", ensureAuthenticated, listCharsController.handle);
router.get("/chars/:id", ensureAuthenticated, getCharController.handle);

export default router;
