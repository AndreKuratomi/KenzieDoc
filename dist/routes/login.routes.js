"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var login_controller_1 = require("../controllers/login.controller");
var validate_schema_middleware_1 = require("../middlewares/validate.schema.middleware");
var login_schema_1 = require("../schemas/login.schema");
var loginRouter = (0, express_1.Router)();
var loginController = new login_controller_1.LoginController();
loginRouter.post("", (0, validate_schema_middleware_1.validateSchema)(login_schema_1.LoginSchema), loginController.handle);
exports.default = loginRouter;
//# sourceMappingURL=login.routes.js.map