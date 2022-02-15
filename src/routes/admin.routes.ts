import { Router } from "express";
import {
  CreateAdminController,
  UpdateAdminController,
} from "../controllers/admin.constroller";

const createAdminController = new CreateAdminController();
const updateAdminController = new UpdateAdminController();

const adminRouter = Router();

adminRouter.post("", createAdminController.handle);
adminRouter.patch("", updateAdminController.handle);

export default adminRouter;
