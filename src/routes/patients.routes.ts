import { Router } from "express";
import {
  CreatePatientController,
  PatientsListController,
  UpdatePatientController,
  DeletePatientController,
} from "../controllers/patient.controller";
import authenticated from "../middlewares/authenticate.user.middletare";
import { validateSchema } from "../middlewares/validate.schema.middleware";
import verifyAdmin from "../middlewares/verify.admin.middleware";
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
patientsRouter.get(
  "",
  authenticated,
  verifyAdmin,
  patientsListController.handle
);
patientsRouter.patch("/:cpf", updatePatientController.handle);
patientsRouter.delete("/:cpf", deletePatientController.handle);

export default patientsRouter;
