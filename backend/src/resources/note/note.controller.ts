import { Request, Response } from "express";
import * as noteService from "./note.service";
import type { NoteBody } from "./note.types";

export async function listNotes(req: Request, res: Response): Promise<void> {
  const notes = await noteService.listNotes(req.session.userId!);
  res.json(notes);
}

export async function getNote(req: Request, res: Response): Promise<void> {
  const note = await noteService.getNote(req.params.id, req.session.userId!);
  if (!note) {
    res.status(404).json({ msg: "Nota não encontrada" });
    return;
  }
  res.json(note);
}

export async function createNote(req: Request, res: Response): Promise<void> {
  const note = await noteService.createNote(req.session.userId!, req.body as NoteBody);
  res.status(201).json(note);
}

export async function updateNote(req: Request, res: Response): Promise<void> {
  const note = await noteService.updateNote(req.params.id, req.session.userId!, req.body as NoteBody);
  if (!note) {
    res.status(404).json({ msg: "Nota não encontrada" });
    return;
  }
  res.json(note);
}

export async function deleteNote(req: Request, res: Response): Promise<void> {
  const deleted = await noteService.deleteNote(req.params.id, req.session.userId!);
  if (!deleted) {
    res.status(404).json({ msg: "Nota não encontrada" });
    return;
  }
  res.status(204).send();
}
