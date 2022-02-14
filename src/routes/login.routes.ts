import { Router } from "express";
import { LoginController } from "../controllers/login.controller";

const userRouter = Router();

const loginUser = new LoginController();

userRouter.post("", loginUser.handle);

export default userRouter;
