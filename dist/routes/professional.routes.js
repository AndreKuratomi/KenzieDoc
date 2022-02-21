"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var professional_controller_1 = require("../controllers/professional.controller");
var authenticate_user_middletare_1 = __importDefault(require("../middlewares/authenticate.user.middletare"));
var validate_schema_middleware_1 = require("../middlewares/validate.schema.middleware");
var verify_account_middleware_1 = __importDefault(require("../middlewares/verify.account.middleware"));
var verify_admin_middleware_1 = __importDefault(require("../middlewares/verify.admin.middleware"));
var professionals_schema_1 = require("../schemas/professionals.schema");
var createProfessionalController = new professional_controller_1.CreateProfessionalController();
var updateProfessionalController = new professional_controller_1.UpdateProfessionalController();
var deleteProfessionalionalController = new professional_controller_1.DeleteProfessionalController();
var professionalListController = new professional_controller_1.ProfessionalsListController();
var professionalByIdController = new professional_controller_1.ProfessionalByIdController();
var professionalBySpecialtyController = new professional_controller_1.ProfessionalBySpecialtyController();
var professionalsRouter = (0, express_1.Router)();
professionalsRouter.post("", (0, validate_schema_middleware_1.validateSchema)(professionals_schema_1.ProfessionalSchema), createProfessionalController.handle);
professionalsRouter.get("", authenticate_user_middletare_1.default, verify_admin_middleware_1.default, professionalListController.handle);
professionalsRouter.get("/:id", authenticate_user_middletare_1.default, verify_account_middleware_1.default, professionalByIdController.handle);
professionalsRouter.get("/specialty/:specialty", authenticate_user_middletare_1.default, professionalBySpecialtyController.handle);
professionalsRouter.patch("/:id", authenticate_user_middletare_1.default, verify_account_middleware_1.default, updateProfessionalController.handle);
professionalsRouter.delete("/:id", authenticate_user_middletare_1.default, verify_account_middleware_1.default, deleteProfessionalionalController.handle);
exports.default = professionalsRouter;
//# sourceMappingURL=professional.routes.js.map