import { Router } from "express";
import {
  CreateAdminController,
  UpdateAdminController,
} from "../controllers/admin.constroller";
import authenticated from "../middlewares/authenticate.user.middletare";
import verifyAdmin from "../middlewares/verify.admin.middleware";

const createAdminController = new CreateAdminController();
const updateAdminController = new UpdateAdminController();

const adminRouter = Router();

adminRouter.post("", createAdminController.handle);
adminRouter.patch(
  "/:id",
  authenticated,
  verifyAdmin,
  updateAdminController.handle
);

export default adminRouter;
