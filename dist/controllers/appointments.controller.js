"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pdf = exports.WaitListController = exports.AppointmentsTomorrowController = exports.AppointmentByProfessionalController = exports.AppointmentByPatientController = exports.DeleteAppointmentController = exports.UpdateAppointmentController = exports.CreateAppointmentController = void 0;
// import { PDFGenerator } from "../utils/pdfGeneretor";
var appointment_service_1 = require("../services/appointment.service");
var typeorm_1 = require("typeorm");
var patients_repository_1 = __importDefault(require("../repositories/patients.repository"));
var professionals_repository_1 = __importDefault(require("../repositories/professionals.repository"));
var email_service_1 = require("../services/email.service");
var whatsapp_service_1 = require("../services/whatsapp.service");
var CreateAppointmentController = /** @class */ (function () {
    function CreateAppointmentController() {
    }
    CreateAppointmentController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var createAppointmentService, data, date, patientRepo, proRepo, user, medic, name, mail, phone, medicName, specialty, day, hour, appointment, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createAppointmentService = new appointment_service_1.CreateAppointmentService();
                        data = req.body;
                        date = data.date;
                        patientRepo = (0, typeorm_1.getCustomRepository)(patients_repository_1.default);
                        proRepo = (0, typeorm_1.getCustomRepository)(professionals_repository_1.default);
                        return [4 /*yield*/, patientRepo.findOne({ where: { cpf: data.patient } })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, proRepo.findOne({
                                where: { council_number: data.professional },
                            })];
                    case 2:
                        medic = _a.sent();
                        name = user === null || user === void 0 ? void 0 : user.name;
                        mail = user === null || user === void 0 ? void 0 : user.email;
                        phone = user === null || user === void 0 ? void 0 : user.phone;
                        medicName = medic === null || medic === void 0 ? void 0 : medic.name;
                        specialty = medic === null || medic === void 0 ? void 0 : medic.specialty;
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 7, , 8]);
                        day = date.split(" ")[0];
                        hour = date.split(" ")[1];
                        return [4 /*yield*/, createAppointmentService.execute(data, day, hour)];
                    case 4:
                        appointment = _a.sent();
                        return [4 /*yield*/, (0, email_service_1.sendAppointmentEmail)(name, medicName, mail, specialty, date, hour)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, (0, whatsapp_service_1.sendAppointmentWhatsapp)(name, medicName, phone, specialty, date)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, res.status(201).json(appointment)];
                    case 7:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_1.message })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return CreateAppointmentController;
}());
exports.CreateAppointmentController = CreateAppointmentController;
var UpdateAppointmentController = /** @class */ (function () {
    function UpdateAppointmentController() {
    }
    UpdateAppointmentController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, data, updateAppointmentService, toUpdate, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        data = req.body;
                        updateAppointmentService = new appointment_service_1.UpdateAppointmentService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, updateAppointmentService.execute(id, data)];
                    case 2:
                        toUpdate = _a.sent();
                        return [2 /*return*/, res.status(200).json(toUpdate)];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(err_2.statusCode).json({ message: err_2.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UpdateAppointmentController;
}());
exports.UpdateAppointmentController = UpdateAppointmentController;
var DeleteAppointmentController = /** @class */ (function () {
    function DeleteAppointmentController() {
    }
    DeleteAppointmentController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteAppointmentService, toDelete;
            return __generator(this, function (_a) {
                id = req.params.id;
                try {
                    deleteAppointmentService = new appointment_service_1.DeleteAppointmentService();
                    toDelete = deleteAppointmentService.execute(id);
                    return [2 /*return*/, res.status(204).json(toDelete)];
                }
                catch (err) {
                    return [2 /*return*/, res.status(err.statusCode).json({ message: err.message })];
                }
                return [2 /*return*/];
            });
        });
    };
    return DeleteAppointmentController;
}());
exports.DeleteAppointmentController = DeleteAppointmentController;
var AppointmentByPatientController = /** @class */ (function () {
    function AppointmentByPatientController() {
    }
    AppointmentByPatientController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentByPatientService, cpf, appointments, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appointmentByPatientService = new appointment_service_1.AppointmentByPatientService();
                        cpf = req.params.cpf;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, appointmentByPatientService.execute(cpf)];
                    case 2:
                        appointments = _a.sent();
                        return [2 /*return*/, res.status(200).json(appointments)];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_3.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AppointmentByPatientController;
}());
exports.AppointmentByPatientController = AppointmentByPatientController;
var AppointmentByProfessionalController = /** @class */ (function () {
    function AppointmentByProfessionalController() {
    }
    AppointmentByProfessionalController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentByProfessionalService, crm, appointments, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appointmentByProfessionalService = new appointment_service_1.AppointmentByProfessionalService();
                        crm = req.params.crm;
                        crm = crm.toUpperCase();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, appointmentByProfessionalService.execute(crm)];
                    case 2:
                        appointments = _a.sent();
                        return [2 /*return*/, res.status(200).json(appointments)];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_4.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AppointmentByProfessionalController;
}());
exports.AppointmentByProfessionalController = AppointmentByProfessionalController;
var AppointmentsTomorrowController = /** @class */ (function () {
    function AppointmentsTomorrowController() {
    }
    AppointmentsTomorrowController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentsTomorrowService, appointments, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appointmentsTomorrowService = new appointment_service_1.AppointmentsTomorrowService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, appointmentsTomorrowService.execute()];
                    case 2:
                        appointments = _a.sent();
                        return [2 /*return*/, res.status(200).json(appointments)];
                    case 3:
                        err_5 = _a.sent();
                        console.log(err_5);
                        return [2 /*return*/, res.status(400).json({ message: err_5.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AppointmentsTomorrowController;
}());
exports.AppointmentsTomorrowController = AppointmentsTomorrowController;
var WaitListController = /** @class */ (function () {
    function WaitListController() {
    }
    WaitListController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var waitListService, crm, waitList, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        waitListService = new appointment_service_1.WaitListService();
                        crm = req.params.crm;
                        crm = crm.toUpperCase();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, waitListService.execute(crm)];
                    case 2:
                        waitList = _a.sent();
                        return [2 /*return*/, res.status(200).json(waitList)];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_6.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return WaitListController;
}());
exports.WaitListController = WaitListController;
var Pdf = /** @class */ (function () {
    function Pdf() {
    }
    Pdf.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    // PDFGenerator();
                    return [2 /*return*/, res.status(200).json("gerou")];
                }
                catch (err) {
                    return [2 /*return*/, res.status(400).json({ message: err.message })];
                }
                return [2 /*return*/];
            });
        });
    };
    return Pdf;
}());
exports.Pdf = Pdf;
//# sourceMappingURL=appointments.controller.js.map