import { Router } from "express";
import professionalsRouter from "./professional.routes";
import patientsRouter from "./patients.routes";
import appointmentsRouter from "./appointments.routes";
import userRouter from "./login.routes";

const router = Router();

router.use("/login", userRouter);
router.use("/professional", professionalsRouter);
router.use("/patient", patientsRouter);
router.use("/appointment", appointmentsRouter);

export default router;
