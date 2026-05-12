import { Schema } from "joi";
import { Request, Response, NextFunction } from "express";

export function validateBody(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      res.status(422).json({ msg: error.message });
      return;
    }
    next();
  };
}
