import { Router } from "express";

import {
  CreateAppointmentController,
  // AppointmentsListController,
  UpdateAppointmentController,
  DeleteAppointmentController,
  AppointmentByPatientController,
  AppointmentByProfessionalController,
  AppointmentsTomorrowController,
  WaitListController,
  // Pdf,
} from "../controllers/appointments.controller";
import isValidUUID from "../middlewares/uuid.middleware";
import { validateSchema } from "../middlewares/validate.schema.middleware";
import { AppointmentSchema } from "../schemas/appointments.schema";

const createAppointmentController = new CreateAppointmentController();
// const appointmentsListController = new AppointmentsListController();
const updateAppointmentController = new UpdateAppointmentController();
const deleteAppointmentController = new DeleteAppointmentController();
const appointmentByPatientController = new AppointmentByPatientController();
const appointmentByProfessionalController =
  new AppointmentByProfessionalController();
const appointmentsTomorrowController = new AppointmentsTomorrowController();
const waitListController = new WaitListController();

// const pdf = new Pdf();

const appointmentsRouter = Router();

appointmentsRouter.post(
  "",
  validateSchema(AppointmentSchema),
  createAppointmentController.handle
);
appointmentsRouter.get("/patient/:cpf", appointmentByPatientController.handle);
appointmentsRouter.get(
  "/professional/:crm",
  appointmentByProfessionalController.handle
);
appointmentsRouter.get("/tomorrow", appointmentsTomorrowController.handle);
// appointmentsRouter.get("/wait_list", appointmentsListController.handle);
appointmentsRouter.get("/wait_list/:crm", waitListController.handle);
appointmentsRouter.patch(
  "/:id",
  isValidUUID,
  updateAppointmentController.handle
);
appointmentsRouter.delete(
  "/:id",
  isValidUUID,
  deleteAppointmentController.handle
);

// appointmentsRouter.get("/pdf", pdf.handle);

export default appointmentsRouter;
