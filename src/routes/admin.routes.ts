import { Router } from "express";

import {
  CreateAdminController,
  UpdateAdminController,
} from "../controllers/admin.controller";
import authenticated from "../middlewares/authenticate.user.middletare";
// import isValidUUID from "../middlewares/uuid.middleware";
import { validateSchema } from "../middlewares/validate.schema.middleware";
import verifyAdmin from "../middlewares/verify.admin.middleware";
import { AdminSchema } from "../schemas/admin.schema";
// import AdminRepository from "../repositories/admin.repository";
// import { getCustomRepository } from "typeorm";

const createAdminController = new CreateAdminController();
const updateAdminController = new UpdateAdminController();

// const adminRepository = getCustomRepository(AdminRepository);

const adminRouter = Router();

adminRouter.post("", validateSchema(AdminSchema), createAdminController.handle);
adminRouter.patch(
  "/:id",
  authenticated,
  verifyAdmin,
  // isValidUUID(adminRepository),
  updateAdminController.handle
);

export default adminRouter;
