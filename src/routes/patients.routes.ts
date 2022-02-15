import { Router } from "express";
import { create, list, updating, deleting } from "../controllers/patient.controller";

const patientsRouter = Router();

patientsRouter.post("", create);
patientsRouter.get("", list);
patientsRouter.patch("/:id", updating);
patientsRouter.delete("/:id", deleting);

export default patientsRouter;
