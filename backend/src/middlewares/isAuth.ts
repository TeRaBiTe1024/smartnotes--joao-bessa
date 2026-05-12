import { Request, Response, NextFunction } from "express";

export function isAuth(req: Request, res: Response, next: NextFunction): void {
  if (!req.session.userId) {
    res.status(401).json({ msg: "Não autenticado" });
    return;
  }
  next();
}
