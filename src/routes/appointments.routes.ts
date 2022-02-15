import { Router } from "express";

import {
  CreateAppointmentController,
  AppointmentsListController,
  UpdateAppointmentController,
  DeleteAppointmentController,
} from "../controllers/appointments.controller";

const createAppointmentController = new CreateAppointmentController();
const appointmentsListController = new AppointmentsListController();
const updateAppointmentController = new UpdateAppointmentController();
const deleteAppointmentController = new DeleteAppointmentController();

const appointmentsRouter = Router();

appointmentsRouter.post("", createAppointmentController.handle);
appointmentsRouter.get("/patient/:cpf", appointmentsListController.handle);
appointmentsRouter.get("/professional/:crm", appointmentsListController.handle);
appointmentsRouter.get("/tomorrow", appointmentsListController.handle);
appointmentsRouter.get("/wait_list", appointmentsListController.handle);
appointmentsRouter.get("/wait_list/:crm", appointmentsListController.handle);
appointmentsRouter.patch("/:id", updateAppointmentController.handle);
appointmentsRouter.delete("/:id", deleteAppointmentController.handle);

export default appointmentsRouter;
