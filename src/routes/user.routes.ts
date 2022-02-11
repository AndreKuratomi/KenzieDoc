import { Router } from "express";
import { CreateUserController } from "../controllers/user/createUser.controller";
import { UserByIdController } from "../controllers/user/userById.controller";
import { ListUsersController } from "../controllers/user/listUsers.controller";
import { whoAmI } from "../middlewares/whoAmI.middleware";
import { validateToken } from "../middlewares/validateToken.middleware";

const userRouter = Router();

const createUserController = new CreateUserController();
const userByIdController = new UserByIdController();
const listUsersController = new ListUsersController();

userRouter.post("", createUserController.handle);
userRouter.get("/:id", validateToken, whoAmI, userByIdController.handle);
userRouter.get("", validateToken, whoAmI, listUsersController.handle);

export default userRouter;
