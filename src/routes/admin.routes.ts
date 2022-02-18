import { Router } from "express";
import {
  CreateAdminController,
  UpdateAdminController,
} from "../controllers/admin.constroller";
import authenticated from "../middlewares/authenticate.user.middletare";
import { validateSchema } from "../middlewares/validate.schema.middleware";
import verifyAdmin from "../middlewares/verify.admin.middleware";
import { AdminSchema } from "../schemas/admin.schema";

const createAdminController = new CreateAdminController();
const updateAdminController = new UpdateAdminController();

const adminRouter = Router();

adminRouter.post("", validateSchema(AdminSchema), createAdminController.handle);
adminRouter.patch(
  "/:id",
  authenticated,
  verifyAdmin,
  updateAdminController.handle
);

export default adminRouter;
