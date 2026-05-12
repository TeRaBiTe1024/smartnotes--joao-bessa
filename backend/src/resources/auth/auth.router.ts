import { Router } from "express";
import rateLimit from "express-rate-limit";
import { validateBody } from "../../middlewares/validateBody";
import { isAuth } from "../../middlewares/isAuth";
import { signupSchema, loginSchema } from "./auth.schema";
import * as authController from "./auth.controller";

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 10 });

const authRouter = Router();

authRouter.post("/signup", authLimiter, validateBody(signupSchema), authController.signup);
authRouter.post("/login", authLimiter, validateBody(loginSchema), authController.login);
authRouter.post("/logout", isAuth, authController.logout);

export default authRouter;
