import { prisma } from "../../lib/prisma";
import type { NoteBody } from "./note.types";

export function listNotes(userId: string) {
  return prisma.note.findMany({ where: { userId } });
}

export function getNote(id: string, userId: string) {
  return prisma.note.findFirst({ where: { id, userId } });
}

export function createNote(userId: string, data: NoteBody) {
  return prisma.note.create({ data: { userId, ...data } });
}

export async function updateNote(id: string, userId: string, data: NoteBody) {
  const note = await prisma.note.findFirst({ where: { id, userId } });
  if (!note) return null;
  return prisma.note.update({ where: { id }, data });
}

export async function deleteNote(id: string, userId: string) {
  const note = await prisma.note.findFirst({ where: { id, userId } });
  if (!note) return false;
  await prisma.note.delete({ where: { id } });
  return true;
}
