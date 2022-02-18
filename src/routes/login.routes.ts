import { Router } from "express";
import { LoginController } from "../controllers/login.controller";
import { validateSchema } from "../middlewares/validate.schema.middleware";
import { LoginSchema } from "../schemas/login.schema";

const loginRouter = Router();

const loginController = new LoginController();

loginRouter.post("", validateSchema(LoginSchema), loginController.handle);

export default loginRouter;
