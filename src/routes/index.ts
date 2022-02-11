import { Router } from "express";

import { ChangePasswordController } from "../controllers/changePassword.controller";
import { LoginUserController } from "../controllers/loginUser.controller";
import { RecoverPasswordController } from "../controllers/recoverPassword.controller";
import { SendEmailController } from "../controllers/sendEmail.controller";
import { whoAmI } from "../middlewares/whoAmI.middleware";
import { validateToken } from "../middlewares/validateToken.middleware";

import userRouter from "./user.routes";
import productRouter from "./product.routes";
import cartRouter from "./cart.routes";
import buyRouter from "./buy.routes";

const router = Router();

const changePasswordController = new ChangePasswordController();
const loginUserController = new LoginUserController();
const recoverPasswordController = new RecoverPasswordController();
const sendEmailController = new SendEmailController();

router.post("/login", loginUserController.handle);
router.post("/email", validateToken, whoAmI, sendEmailController.handle);
router.post("/recuperar", recoverPasswordController.handle);
router.post("/alterar_senha", changePasswordController.handle);

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/cart", cartRouter);
router.use("/buy", buyRouter);

export default router;
