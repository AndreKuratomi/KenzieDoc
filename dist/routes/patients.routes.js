"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var patient_controller_1 = require("../controllers/patient.controller");
var validate_schema_middleware_1 = require("../middlewares/validate.schema.middleware");
var patients_schema_1 = require("../schemas/patients.schema");
var createPatientController = new patient_controller_1.CreatePatientController();
var patientsListController = new patient_controller_1.PatientsListController();
var updatePatientController = new patient_controller_1.UpdatePatientController();
var deletePatientController = new patient_controller_1.DeletePatientController();
var patientsRouter = (0, express_1.Router)();
patientsRouter.post("", (0, validate_schema_middleware_1.validateSchema)(patients_schema_1.PatientSchema), createPatientController.handle);
patientsRouter.get("", patientsListController.handle);
patientsRouter.patch("/:cpf", updatePatientController.handle);
patientsRouter.delete("/:cpf", deletePatientController.handle);
exports.default = patientsRouter;
//# sourceMappingURL=patients.routes.js.map