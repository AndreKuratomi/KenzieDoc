"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var email_controller_1 = require("../controllers/email.controller");
var upload = (0, multer_1.default)({ dest: '../utils/temp' });
var emailRouter = (0, express_1.Router)();
var sendMailController = new email_controller_1.SendEmailController();
// const sendPrescriptionEmailController = new SendPrescriptionEmailController()
emailRouter.post("/", sendMailController.handle);
// emailRouter.post("/prescription", upload.single('attachments'), sendPrescriptionEmailController.handle);
exports.default = emailRouter;
//# sourceMappingURL=email.routes.js.map