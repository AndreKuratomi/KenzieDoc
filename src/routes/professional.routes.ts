import { Router } from "express";
import {
  CreateProfessionalController,
  DeleteProfessionalController,
  ProfessionalsListController,
  UpdateProfessionalController,
} from "../controllers/professional.controller";

const createProfessionalController = new CreateProfessionalController();
const updateProfessionalController = new UpdateProfessionalController();
const deleteProfessionalionalController = new DeleteProfessionalController();
const professionalListController = new ProfessionalsListController();

const professionalsRouter = Router();

professionalsRouter.post("", createProfessionalController.handle);
professionalsRouter.get("", professionalListController.handle);
professionalsRouter.patch("/:id", updateProfessionalController.handle);
professionalsRouter.delete("/:id", deleteProfessionalionalController.handle);

export default professionalsRouter;
