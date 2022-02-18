import { Router } from "express";
import professionalsRouter from "./professional.routes";
import patientsRouter from "./patients.routes";
import appointmentsRouter from "./appointments.routes";
import loginRouter from "./login.routes";
import adminRouter from "./admin.routes";
import emailRouter from "./email.routes";

const router = Router();

router.use("/login", loginRouter);
router.use("/professional", professionalsRouter);
router.use("/patient", patientsRouter);
router.use("/appointment", appointmentsRouter);
router.use("/admin", adminRouter);
router.use('/send', emailRouter)

export default router;
