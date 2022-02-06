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
import { CreateMeetController } from "./controllers/Meet/Create";
import { ListMeetController } from "./controllers/Meet/List";
import { GetEventController } from "./controllers/Event/Get";
import { GetMeetController } from "./controllers/Meet/Get";
import { isAvalibleDate } from "./middlewares/isAvalibleDate";
import { FinishedMeetController } from "./controllers/Meet/Finished";
import { userCharAlreadyRegistred } from "./middlewares/userCharAlreadyRegistred";
import { InsertCharMeetController } from "./controllers/Meet/InsertChar";
import { ConfirmationUserController } from "./controllers/User/Confirmation";
import { tokenVerification } from "./middlewares/tokenVerification";
import { userIsActivated } from "./middlewares/userIsActivated";
import { EventsCharController } from "./controllers/Char/Events";

const router = Router();
router.get("/", (req: Request, res: Response) =>
  res.send(
    `Welcome to velha guarda api ${process.env.HOST}:${process.env.PORT}`
  )
);

// user controllers
const createUserController = new CreateUserController();
const confirmationUserController = new ConfirmationUserController();
const deleteUserController = new DeleteUserController();
const listUserController = new ListUserController();
const getUserController = new GetUserController();
const getMembersUserController = new GetMembersUserController();

// session controller
const createSessionController = new CreateSessionController();
const getUserByTokenController = new GetUserByTokenController();

//char controller

const listCharsController = new ListCharsController();
const getCharController = new GetCharController();
const getCharEventsController = new EventsCharController();

//event controller

const createEventController = new CreateEventController();
const listEventController = new ListEventController();
const getEventController = new GetEventController();

//meet controller

const createMeetController = new CreateMeetController();
const listMeetController = new ListMeetController();
const getMeetController = new GetMeetController();
const finishedMeetController = new FinishedMeetController();
const insertCharMeetController = new InsertCharMeetController();

// user resources
router.get("/users", ensureAuthenticated, listUserController.handle);
router.get(
  "/users/confirmation/:email/:token",
  tokenVerification,
  confirmationUserController.handle
);
router.post("/users", createUserController.handle);
router.delete(
  "/users/:email",
  ensureAuthenticated,
  deleteUserController.handle
);
router.get("/users/:email", ensureAuthenticated, getUserController.handle);
router.get(
  "/users/:email/chars",
  ensureAuthenticated,
  getUserController.handle
);
router.get(
  "/users/:email/events",
  ensureAuthenticated,
  getUserController.handle
);
router.get("/users/:id/events", ensureAuthenticated, getUserController.handle);
router.get("/members", ensureAuthenticated, getMembersUserController.handle);

// session resources
router.post("/session", userIsActivated, createSessionController.handle);
router.get("/session", ensureAuthenticated, getUserByTokenController.handle);

// char resources
router.get("/chars", listCharsController.handle);
router.get("/chars/:id", ensureAuthenticated, getCharController.handle);
router.get(
  "/chars/:id/meetings",
  ensureAuthenticated,
  getCharController.handle
);
router.get(
  "/chars/:id/events",
  ensureAuthenticated,
  getCharEventsController.handle
);

// event resources
router.post("/events", ensureAuthenticated, createEventController.handle);
router.get("/events", ensureAuthenticated, listEventController.handle);
router.get("/events/:id", ensureAuthenticated, getEventController.handle);
router.get(
  "/events/:id/meetings",
  ensureAuthenticated,
  getEventController.handle
);

// meet resources
router.get("/meetings", ensureAuthenticated, listMeetController.handle);
router.get("/meetings/:id", ensureAuthenticated, getMeetController.handle);
router.get(
  "/meetings/:id/chars",
  ensureAuthenticated,
  getMeetController.handle
);
router.get(
  "/meetings/:id/event",
  ensureAuthenticated,
  getMeetController.handle
);
router.post(
  "/meetings",
  ensureAuthenticated,
  isAvalibleDate,
  createMeetController.handle
);
router.put("/meetings", ensureAuthenticated, finishedMeetController.handle);
router.put(
  "/meetings/:id",
  ensureAuthenticated,
  userCharAlreadyRegistred,
  insertCharMeetController.handle
);

export default router;
