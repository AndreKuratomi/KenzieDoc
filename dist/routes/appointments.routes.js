"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var appointments_controller_1 = require("../controllers/appointments.controller");
var uuid_middleware_1 = __importDefault(require("../middlewares/uuid.middleware"));
var validate_schema_middleware_1 = require("../middlewares/validate.schema.middleware");
var appointments_schema_1 = require("../schemas/appointments.schema");
var createAppointmentController = new appointments_controller_1.CreateAppointmentController();
// const appointmentsListController = new AppointmentsListController();
var updateAppointmentController = new appointments_controller_1.UpdateAppointmentController();
var deleteAppointmentController = new appointments_controller_1.DeleteAppointmentController();
var appointmentByPatientController = new appointments_controller_1.AppointmentByPatientController();
var appointmentByProfessionalController = new appointments_controller_1.AppointmentByProfessionalController();
var appointmentsTomorrowController = new appointments_controller_1.AppointmentsTomorrowController();
var waitListController = new appointments_controller_1.WaitListController();
// const pdf = new Pdf();
var appointmentsRouter = (0, express_1.Router)();
appointmentsRouter.post("", (0, validate_schema_middleware_1.validateSchema)(appointments_schema_1.AppointmentSchema), createAppointmentController.handle);
appointmentsRouter.get("/patient/:cpf", appointmentByPatientController.handle);
appointmentsRouter.get("/professional/:crm", appointmentByProfessionalController.handle);
appointmentsRouter.get("/tomorrow", appointmentsTomorrowController.handle);
// appointmentsRouter.get("/wait_list", appointmentsListController.handle);
appointmentsRouter.get("/wait_list/:crm", waitListController.handle);
appointmentsRouter.patch("/:id", uuid_middleware_1.default, updateAppointmentController.handle);
appointmentsRouter.delete("/:id", uuid_middleware_1.default, deleteAppointmentController.handle);
// appointmentsRouter.get("/pdf", pdf.handle);
exports.default = appointmentsRouter;
//# sourceMappingURL=appointments.routes.js.map