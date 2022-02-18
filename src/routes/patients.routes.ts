import { Router } from "express";
import {
  CreatePatientController,
  PatientsListController,
  UpdatePatientController,
  DeletePatientController,
} from "../controllers/patient.controller";
import { validateSchema } from "../middlewares/validate.schema.middleware";
import { PatientSchema } from "../schemas/patients.schema";

const createPatientController = new CreatePatientController();
const patientsListController = new PatientsListController();
const updatePatientController = new UpdatePatientController();
const deletePatientController = new DeletePatientController();

const patientsRouter = Router();

patientsRouter.post(
  "",
  validateSchema(PatientSchema),
  createPatientController.handle
);
patientsRouter.get("", patientsListController.handle);
patientsRouter.patch("/:cpf", updatePatientController.handle);
patientsRouter.delete("/:cpf", deletePatientController.handle);

export default patientsRouter;
