import { Request, Response } from "express";
import * as authService from "./auth.service";
import type { SignupBody, LoginBody } from "./auth.types";

export async function signup(req: Request, res: Response): Promise<void> {
  const user = await authService.signup(req.body as SignupBody);
  if (!user) {
    res.status(400).json({ msg: "E-mail já cadastrado" });
    return;
  }
  res.status(201).json(user);
}

export async function login(req: Request, res: Response): Promise<void> {
  const user = await authService.login(req.body as LoginBody);
  if (!user) {
    res.status(401).json({ msg: "Credenciais inválidas" });
    return;
  }
  req.session.userId = user.id;
  res.json({ msg: "Usuário autenticado" });
}

export function logout(req: Request, res: Response): void {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ msg: "Sessão encerrada" });
  });
}
