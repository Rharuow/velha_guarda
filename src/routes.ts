import { Request, Response, Router } from "express";
import { ListCharsController } from "./controllers/Char/List";
import { CreateSessionController } from "./controllers/Session/Create";
import { CreateUserController } from "./controllers/User/Create";
import { DeleteUserController } from "./controllers/User/Delete";
import { GetUserByTokenController } from "./controllers/Session/GetUserByToken";
import { ListUserController } from "./controllers/User/List";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { GetUserController } from "./controllers/User/Get";
import { GetCharController } from "./controllers/Char/Get";
import { GetMembersUserController } from "./controllers/User/GetMembers";
import { CreateEventController } from "./controllers/Event/Create";
import { ListEventController } from "./controllers/Event/List";
import { GetUserEventsController } from "./controllers/User/GetUserEvents";
import { CreateMeetController } from "./controllers/Meet/Create";
import { ListMeetController } from "./controllers/Meet/List";

const router = Router();
router.get("/", (req: Request, res: Response) =>
  res.send(
    `Welcome to velha guarda api ${process.env.HOST}:${process.env.PORT}`
  )
);

// user controllers
const createUserController = new CreateUserController();
const deleteUserController = new DeleteUserController();
const listUserController = new ListUserController();
const getUserController = new GetUserController();
const getMembersUserController = new GetMembersUserController();
const getUserEventsController = new GetUserEventsController();

// session controller
const createSessionController = new CreateSessionController();
const getUserByTokenController = new GetUserByTokenController();

//char controller

const listCharsController = new ListCharsController();
const getCharController = new GetCharController();

//event controller

const createEventController = new CreateEventController();
const listEventController = new ListEventController();

//meet controller

const createMeetController = new CreateMeetController();
const listMeetController = new ListMeetController();

// user resources
router.get("/users", ensureAuthenticated, listUserController.handle);
router.post("/users", createUserController.handle);
router.delete(
  "/users/:email",
  ensureAuthenticated,
  deleteUserController.handle
);
router.get("/users/:email", ensureAuthenticated, getUserController.handle);
router.get(
  "/users/:email/events",
  ensureAuthenticated,
  getUserEventsController.handle
);
router.get("/members", ensureAuthenticated, getMembersUserController.handle);

// session resources
router.post("/session", createSessionController.handle);
router.get("/session", ensureAuthenticated, getUserByTokenController.handle);

// char resources
router.get("/chars", ensureAuthenticated, listCharsController.handle);
router.get("/chars/:id", ensureAuthenticated, getCharController.handle);

// event resources
router.post("/events", ensureAuthenticated, createEventController.handle);
router.get("/events", ensureAuthenticated, listEventController.handle);

// meet resources
router.get("/meetings", ensureAuthenticated, listMeetController.handle);
router.post("/meetings", ensureAuthenticated, createMeetController.handle);
export default router;
