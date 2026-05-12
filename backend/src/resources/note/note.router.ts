import { Router } from "express";
import { isAuth } from "../../middlewares/isAuth";
import { validateBody } from "../../middlewares/validateBody";
import { noteSchema } from "./note.schema";
import * as noteController from "./note.controller";

const noteRouter = Router();

noteRouter.use(isAuth);

noteRouter.get("/", noteController.listNotes);
noteRouter.post("/", validateBody(noteSchema), noteController.createNote);
noteRouter.get("/:id", noteController.getNote);
noteRouter.put("/:id", validateBody(noteSchema), noteController.updateNote);
noteRouter.delete("/:id", noteController.deleteNote);

export default noteRouter;
