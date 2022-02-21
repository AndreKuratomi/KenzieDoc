"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var admin_controller_1 = require("../controllers/admin.controller");
var authenticate_user_middletare_1 = __importDefault(require("../middlewares/authenticate.user.middletare"));
// import isValidUUID from "../middlewares/uuid.middleware";
var validate_schema_middleware_1 = require("../middlewares/validate.schema.middleware");
var verify_admin_middleware_1 = __importDefault(require("../middlewares/verify.admin.middleware"));
var admin_schema_1 = require("../schemas/admin.schema");
// import AdminRepository from "../repositories/admin.repository";
// import { getCustomRepository } from "typeorm";
var createAdminController = new admin_controller_1.CreateAdminController();
var updateAdminController = new admin_controller_1.UpdateAdminController();
// const adminRepository = getCustomRepository(AdminRepository);
var adminRouter = (0, express_1.Router)();
adminRouter.post("", (0, validate_schema_middleware_1.validateSchema)(admin_schema_1.AdminSchema), createAdminController.handle);
adminRouter.patch("/:id", authenticate_user_middletare_1.default, verify_admin_middleware_1.default, 
// isValidUUID(adminRepository),
updateAdminController.handle);
exports.default = adminRouter;
//# sourceMappingURL=admin.routes.js.map