import { Router } from "express";
import multer from "multer";
import {
  SendEmailController,
  // SendPrescriptionEmailController
} from "../controllers/email.controller";
const upload = multer({ dest: "tmp/" });

const emailRouter = Router();

const sendMailController = new SendEmailController();
// const sendPrescriptionEmailController = new SendPrescriptionEmailController()

emailRouter.post("/", sendMailController.handle);
// emailRouter.post("/prescription", upload.single('attachments'), sendPrescriptionEmailController.handle);

export default emailRouter;
