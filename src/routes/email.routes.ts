import { Router } from "express";
import multer from "multer";
import { SendEmailController } from "../controllers/email.controller";
const upload = multer({ dest: "tmp/" });

const emailRouter = Router();

const sendMailController = new SendEmailController();

emailRouter.post("/", sendMailController.handle);

export default emailRouter;
