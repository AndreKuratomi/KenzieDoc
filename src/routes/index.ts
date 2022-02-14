import { Router } from "express";
import professionalsRouter from "./professional.routes";
import patientsRouter from "./patients.routes";
import appointmentsRouter from "./appointments.routes";

const router = Router();

router.use("/professional", professionalsRouter);
router.use("/patient", patientsRouter);
router.use("/appointment", appointmentsRouter);

export default router;
