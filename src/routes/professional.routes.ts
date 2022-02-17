import { Router } from "express";
import {
  CreateProfessionalController,
  DeleteProfessionalController,
  ProfessionalByIdController,
  ProfessionalsListController,
  UpdateProfessionalController,
} from "../controllers/professional.controller";
import authenticated from "../middlewares/authenticate.user.middletare";
import verifyAccount from "../middlewares/verify.account.middleware";
import verifyAdmin from "../middlewares/verify.admin.middleware";

const createProfessionalController = new CreateProfessionalController();
const updateProfessionalController = new UpdateProfessionalController();
const deleteProfessionalionalController = new DeleteProfessionalController();
const professionalListController = new ProfessionalsListController();
const professionalByIdController = new ProfessionalByIdController();

const professionalsRouter = Router();

professionalsRouter.post("", createProfessionalController.handle);
professionalsRouter.get(
  "",
  authenticated,
  verifyAdmin,
  professionalListController.handle
);
professionalsRouter.get(
  "/:id",
  authenticated,
  verifyAccount,
  professionalByIdController.handle
);
professionalsRouter.patch(
  "/:id",
  authenticated,
  verifyAccount,
  updateProfessionalController.handle
);
professionalsRouter.delete(
  "/:id",
  authenticated,
  verifyAccount,
  deleteProfessionalionalController.handle
);

export default professionalsRouter;
