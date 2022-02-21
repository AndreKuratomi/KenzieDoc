"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var professional_routes_1 = __importDefault(require("./professional.routes"));
var patients_routes_1 = __importDefault(require("./patients.routes"));
var appointments_routes_1 = __importDefault(require("./appointments.routes"));
var login_routes_1 = __importDefault(require("./login.routes"));
var admin_routes_1 = __importDefault(require("./admin.routes"));
var email_routes_1 = __importDefault(require("./email.routes"));
var router = (0, express_1.Router)();
router.use("/login", login_routes_1.default);
router.use("/professional", professional_routes_1.default);
router.use("/patient", patients_routes_1.default);
router.use("/appointment", appointments_routes_1.default);
router.use("/admin", admin_routes_1.default);
router.use('/send', email_routes_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map