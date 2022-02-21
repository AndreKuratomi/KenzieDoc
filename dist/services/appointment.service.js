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
exports.prescriptionPdf = exports.DeleteAppointmentService = exports.UpdateAppointmentService = exports.WaitListService = exports.AppointmentsTomorrowService = exports.AppointmentByProfessionalService = exports.AppointmentByPatientService = exports.CreateAppointmentService = void 0;
var appointments_repository_1 = require("../repositories/appointments.repository");
var typeorm_1 = require("typeorm");
var entities_1 = require("../entities");
var typeorm_2 = require("typeorm");
var errors_1 = __importDefault(require("../utils/errors"));
var email_service_1 = require("./email.service");
var functions_1 = require("../utils/functions");
var pdfGeneretor_1 = require("../utils/pdfGeneretor");
var whatsapp_service_1 = require("./whatsapp.service");
var CreateAppointmentService = /** @class */ (function () {
    function CreateAppointmentService() {
    }
    CreateAppointmentService.prototype.execute = function (data, date, hour) {
        return __awaiter(this, void 0, void 0, function () {
            var patientRepo, proRepo, user, medic, appointmentsRepository, newAppointment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        patientRepo = (0, typeorm_1.getRepository)(entities_1.Patient);
                        proRepo = (0, typeorm_1.getRepository)(entities_1.Professional);
                        return [4 /*yield*/, patientRepo.findOne({ where: { cpf: data.patient } })];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, proRepo.findOne({
                                where: { council_number: data.professional },
                            })];
                    case 2:
                        medic = _a.sent();
                        appointmentsRepository = (0, typeorm_1.getCustomRepository)(appointments_repository_1.AppointmentsRepository);
                        newAppointment = appointmentsRepository.create(data);
                        return [4 /*yield*/, appointmentsRepository.save(newAppointment)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, newAppointment];
                }
            });
        });
    };
    return CreateAppointmentService;
}());
exports.CreateAppointmentService = CreateAppointmentService;
var AppointmentByPatientService = /** @class */ (function () {
    function AppointmentByPatientService() {
    }
    AppointmentByPatientService.prototype.execute = function (patientId) {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentsRepository, appointments, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appointmentsRepository = (0, typeorm_1.getCustomRepository)(appointments_repository_1.AppointmentsRepository);
                        return [4 /*yield*/, appointmentsRepository.find({
                                where: { patient: patientId },
                                relations: ["patient", "professional"],
                            })];
                    case 1:
                        appointments = _a.sent();
                        result = (0, functions_1.formatPatientAppointment)(appointments);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return AppointmentByPatientService;
}());
exports.AppointmentByPatientService = AppointmentByPatientService;
var AppointmentByProfessionalService = /** @class */ (function () {
    function AppointmentByProfessionalService() {
    }
    AppointmentByProfessionalService.prototype.execute = function (professionalId) {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentsRepository, appointments, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appointmentsRepository = (0, typeorm_1.getCustomRepository)(appointments_repository_1.AppointmentsRepository);
                        return [4 /*yield*/, appointmentsRepository.find({
                                where: { professional: professionalId },
                                relations: ["professional", "patient"],
                            })];
                    case 1:
                        appointments = _a.sent();
                        result = (0, functions_1.formatProfessionalAppointment)(appointments);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return AppointmentByProfessionalService;
}());
exports.AppointmentByProfessionalService = AppointmentByProfessionalService;
var AppointmentsTomorrowService = /** @class */ (function () {
    function AppointmentsTomorrowService() {
    }
    AppointmentsTomorrowService.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentsRepository, currentDate, yearMonth, tomorrow, endTomorrow, appointments, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appointmentsRepository = (0, typeorm_1.getCustomRepository)(appointments_repository_1.AppointmentsRepository);
                        currentDate = new Date();
                        yearMonth = currentDate.getFullYear() +
                            "-" +
                            String(currentDate.getMonth() + 1).padStart(2, "0") +
                            "-";
                        tomorrow = yearMonth + String(currentDate.getDate()).padStart(2, "0") + "T21:00";
                        endTomorrow = yearMonth + String(currentDate.getDate() + 1).padStart(2, "0") + "T20:59";
                        return [4 /*yield*/, appointmentsRepository.find({
                                where: { date: (0, typeorm_2.Between)(tomorrow, endTomorrow) },
                                relations: ["professional", "patient"],
                            })];
                    case 1:
                        appointments = _a.sent();
                        result = (0, functions_1.formatAppointmentsTomorrow)(appointments);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return AppointmentsTomorrowService;
}());
exports.AppointmentsTomorrowService = AppointmentsTomorrowService;
var WaitListService = /** @class */ (function () {
    function WaitListService() {
    }
    WaitListService.prototype.execute = function (crm) {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentsRepository, currentDate, lateAppointments, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appointmentsRepository = (0, typeorm_1.getCustomRepository)(appointments_repository_1.AppointmentsRepository);
                        currentDate = new Date();
                        currentDate.setHours(currentDate.getHours() - 3);
                        return [4 /*yield*/, appointmentsRepository.find({
                                where: {
                                    professional: crm,
                                    finished: false,
                                    date: (0, typeorm_1.LessThan)(currentDate),
                                },
                                relations: ["professional", "patient"],
                            })];
                    case 1:
                        lateAppointments = _a.sent();
                        result = (0, functions_1.formatWaitList)(lateAppointments);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return WaitListService;
}());
exports.WaitListService = WaitListService;
var UpdateAppointmentService = /** @class */ (function () {
    function UpdateAppointmentService() {
    }
    UpdateAppointmentService.prototype.execute = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentsRepository, updatedAppointment, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appointmentsRepository = (0, typeorm_1.getCustomRepository)(appointments_repository_1.AppointmentsRepository);
                        return [4 /*yield*/, appointmentsRepository.update(id, data)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, appointmentsRepository.findOne(id, {
                                relations: ["professional", "patient"],
                            })];
                    case 2:
                        updatedAppointment = _a.sent();
                        if (!updatedAppointment) {
                            throw new errors_1.default("This appointment does not exist", 404);
                        }
                        result = {
                            id: updatedAppointment.id,
                            date: updatedAppointment.date,
                            professional: updatedAppointment.professional.council_number,
                            patient: updatedAppointment.patient.cpf,
                            finished: updatedAppointment.finished,
                        };
                        // const email = updatedAppointment.patient.email;
                        // const patientName = updatedAppointment.patient.name;
                        // const {name, specialty} = updatedAppointment.professional;
                        // await prescriptionPdf(email, patientName, name, specialty);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return UpdateAppointmentService;
}());
exports.UpdateAppointmentService = UpdateAppointmentService;
var DeleteAppointmentService = /** @class */ (function () {
    function DeleteAppointmentService() {
    }
    DeleteAppointmentService.prototype.execute = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var appointmentsRepository, patientRepo, proRepo, appointmentToDelete, user, medic, name, mail, phone, medicName, specialty, date, hour, deletedAppointment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        appointmentsRepository = (0, typeorm_1.getCustomRepository)(appointments_repository_1.AppointmentsRepository);
                        patientRepo = (0, typeorm_1.getRepository)(entities_1.Patient);
                        proRepo = (0, typeorm_1.getRepository)(entities_1.Professional);
                        return [4 /*yield*/, appointmentsRepository.findOne(id, {
                                relations: ["professional", "patient"],
                            })];
                    case 1:
                        appointmentToDelete = _a.sent();
                        return [4 /*yield*/, patientRepo.findOne({
                                where: { cpf: appointmentToDelete === null || appointmentToDelete === void 0 ? void 0 : appointmentToDelete.patient.cpf },
                            })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, proRepo.findOne({
                                where: {
                                    council_number: appointmentToDelete === null || appointmentToDelete === void 0 ? void 0 : appointmentToDelete.professional.council_number,
                                },
                            })];
                    case 3:
                        medic = _a.sent();
                        name = user === null || user === void 0 ? void 0 : user.name;
                        mail = user === null || user === void 0 ? void 0 : user.email;
                        phone = user === null || user === void 0 ? void 0 : user.phone;
                        medicName = medic === null || medic === void 0 ? void 0 : medic.name;
                        specialty = medic === null || medic === void 0 ? void 0 : medic.specialty;
                        date = appointmentToDelete === null || appointmentToDelete === void 0 ? void 0 : appointmentToDelete.date.toLocaleDateString();
                        hour = appointmentToDelete === null || appointmentToDelete === void 0 ? void 0 : appointmentToDelete.date.toLocaleTimeString();
                        if (!appointmentToDelete) {
                            throw new Error("This appointment does not exist");
                        }
                        return [4 /*yield*/, (0, email_service_1.sendCancelationEmail)(name, medicName, mail, specialty, date, hour)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, (0, whatsapp_service_1.sendCancelationWhatsapp)(name, medicName, phone, specialty)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, appointmentsRepository.remove(appointmentToDelete)];
                    case 6:
                        deletedAppointment = _a.sent();
                        return [2 /*return*/, deletedAppointment];
                }
            });
        });
    };
    return DeleteAppointmentService;
}());
exports.DeleteAppointmentService = DeleteAppointmentService;
var prescriptionPdf = function (email, name, medicName, specialty) { return __awaiter(void 0, void 0, void 0, function () {
    var err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                (0, pdfGeneretor_1.PDFGenerator)();
                return [4 /*yield*/, (0, email_service_1.sendPrescription)(email, name, medicName, specialty)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                console.log(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.prescriptionPdf = prescriptionPdf;
//# sourceMappingURL=appointment.service.js.map