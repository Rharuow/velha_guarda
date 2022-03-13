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
import { ConfirmationUserController } from "./controllers/User/Confirmation";
import { ListEventController } from "./controllers/Event/List";
import { CreateMeetController } from "./controllers/Meet/Create";
import { ListMeetController } from "./controllers/Meet/List";
import { GetEventController } from "./controllers/Event/Get";
import { GetMeetController } from "./controllers/Meet/Get";
import { isAvalibleDate } from "./middlewares/isAvalibleDate";
import { FinishedMeetController } from "./controllers/Meet/Finished";
import { userCharAlreadyRegistred } from "./middlewares/userCharAlreadyRegistred";
import { InsertCharMeetController } from "./controllers/Meet/InsertChar";
import { tokenVerification } from "./middlewares/tokenVerification";
import { userIsActivated } from "./middlewares/userIsActivated";
import { RemoveCharMeetController } from "./controllers/Meet/RemoveChar";
import { DeleteMeetController } from "./controllers/Meet/Delete";
import { UpdateCharController } from "./controllers/Char/Update";
import { DeleteEventController } from "./controllers/Event/Delete";
import { AvailableMeetController } from "./controllers/Meet/Available";
import { EditEventController } from "./controllers/Event/Edit";
import { CreateCharController } from "./controllers/Char/Create";

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
const confirmationUserController = new ConfirmationUserController();

// session controller
const createSessionController = new CreateSessionController();
const getUserByTokenController = new GetUserByTokenController();

//char controller

const listCharsController = new ListCharsController();
const getCharController = new GetCharController();
const updateCharController = new UpdateCharController();
const createCharController = new CreateCharController();

//event controller

const createEventController = new CreateEventController();
const editEventController = new EditEventController();
const deleteEventController = new DeleteEventController();
const listEventController = new ListEventController();
const getEventController = new GetEventController();

//meet controller

const createMeetController = new CreateMeetController();
const listMeetController = new ListMeetController();
const getMeetController = new GetMeetController();
const deleteMeetController = new DeleteMeetController();
const finishedMeetController = new FinishedMeetController();
const insertCharMeetController = new InsertCharMeetController();
const removeCharMeetController = new RemoveCharMeetController();
const availableMeetController = new AvailableMeetController();

// user resources
router.get("/users", ensureAuthenticated, listUserController.handle);
router.post("/users", createUserController.handle);
router.delete(
  "/users/:email",
  ensureAuthenticated,
  deleteUserController.handle
);
router.get(
  "/users/confirmation/:email/:token",
  tokenVerification,
  confirmationUserController.handle
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
router.post("/chars", createCharController.handle);
router.get("/chars/:id", ensureAuthenticated, getCharController.handle);
router.put("/chars/:id", ensureAuthenticated, updateCharController.handle);
router.get(
  "/chars/:id/meetings",
  ensureAuthenticated,
  getCharController.handle
);

// event resources
router.post("/events", ensureAuthenticated, createEventController.handle);
router.get("/events", ensureAuthenticated, listEventController.handle);
router.get("/events/:id", ensureAuthenticated, getEventController.handle);
router.put("/events/:id", ensureAuthenticated, editEventController.handle);
router.delete("/events/:id", ensureAuthenticated, deleteEventController.handle);
router.get(
  "/events/:id/meetings",
  ensureAuthenticated,
  getEventController.handle
);

// meet resources
router.get("/meetings", ensureAuthenticated, listMeetController.handle);
router.get("/meetings/:id", ensureAuthenticated, getMeetController.handle);
router.put(
  "/meetings/:id",
  ensureAuthenticated,
  availableMeetController.handle
);
router.delete(
  "/meetings/:id",
  ensureAuthenticated,
  deleteMeetController.handle
);
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
router.post("/meetings", ensureAuthenticated, createMeetController.handle);
router.put("/meetings", ensureAuthenticated, finishedMeetController.handle);
router.put(
  "/meetings/:id/chars/:char_id",
  ensureAuthenticated,
  userCharAlreadyRegistred,
  insertCharMeetController.handle
);
router.delete(
  "/meetings/:id/chars/:char_id",
  ensureAuthenticated,
  userCharAlreadyRegistred,
  removeCharMeetController.handle
);

export default router;
