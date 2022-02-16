import { Router } from "express";

import {
  CreateAppointmentController,
  AppointmentsListController,
  UpdateAppointmentController,
  DeleteAppointmentController,
  AppointmentByPatientController,
  AppointmentByProfessionalController,
  AppointmentsTomorrowController,
  WaitListController,
} from "../controllers/appointments.controller";

const createAppointmentController = new CreateAppointmentController();
const appointmentsListController = new AppointmentsListController();
const updateAppointmentController = new UpdateAppointmentController();
const deleteAppointmentController = new DeleteAppointmentController();
const appointmentByPatientController = new AppointmentByPatientController();
const appointmentByProfessionalController =
  new AppointmentByProfessionalController();
const appointmentsTomorrowController = new AppointmentsTomorrowController();
const waitListController = new WaitListController();

const appointmentsRouter = Router();

appointmentsRouter.post("", createAppointmentController.handle);
appointmentsRouter.get("/patient/:cpf", appointmentByPatientController.handle);
appointmentsRouter.get(
  "/professional/:crm",
  appointmentByProfessionalController.handle
);
appointmentsRouter.get("/tomorrow", appointmentsTomorrowController.handle);
appointmentsRouter.get("/wait_list", appointmentsListController.handle);
appointmentsRouter.get("/wait_list/:crm", waitListController.handle);
appointmentsRouter.patch("/:id", updateAppointmentController.handle);
appointmentsRouter.delete("/:id", deleteAppointmentController.handle);

export default appointmentsRouter;
