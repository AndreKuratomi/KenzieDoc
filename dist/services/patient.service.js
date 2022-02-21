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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePatientService = exports.UpdatePatientService = exports.PatientsListService = exports.CreatePatientService = void 0;
var patients_repository_1 = __importDefault(require("../repositories/patients.repository"));
var typeorm_1 = require("typeorm");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var errors_1 = __importDefault(require("../utils/errors"));
var CreatePatientService = /** @class */ (function () {
    function CreatePatientService() {
    }
    CreatePatientService.prototype.execute = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var patientsRepository, _a, emailAlreadyExists, cpfAlreadyExists, newPatient, data_password, newData;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        patientsRepository = (0, typeorm_1.getCustomRepository)(patients_repository_1.default);
                        _a = data;
                        return [4 /*yield*/, bcryptjs_1.default.hash(data.password, 10)];
                    case 1:
                        _a.password = _b.sent();
                        return [4 /*yield*/, patientsRepository.findOne({
                                where: {
                                    email: data.email,
                                },
                            })];
                    case 2:
                        emailAlreadyExists = _b.sent();
                        return [4 /*yield*/, patientsRepository.findOne({
                                where: {
                                    cpf: data.cpf,
                                },
                            })];
                    case 3:
                        cpfAlreadyExists = _b.sent();
                        if (cpfAlreadyExists) {
                            throw new errors_1.default("User already registered!", 409);
                        }
                        if (emailAlreadyExists) {
                            throw new errors_1.default("Email already registered!", 409);
                        }
                        newPatient = patientsRepository.create(data);
                        return [4 /*yield*/, patientsRepository.save(newPatient)];
                    case 4:
                        _b.sent();
                        data_password = newPatient.password, newData = __rest(newPatient, ["password"]);
                        return [2 /*return*/, newData];
                }
            });
        });
    };
    return CreatePatientService;
}());
exports.CreatePatientService = CreatePatientService;
var PatientsListService = /** @class */ (function () {
    function PatientsListService() {
    }
    PatientsListService.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var patientsRepository, patientsList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        patientsRepository = (0, typeorm_1.getCustomRepository)(patients_repository_1.default);
                        return [4 /*yield*/, patientsRepository.find()];
                    case 1:
                        patientsList = _a.sent();
                        return [2 /*return*/, patientsList];
                }
            });
        });
    };
    return PatientsListService;
}());
exports.PatientsListService = PatientsListService;
var UpdatePatientService = /** @class */ (function () {
    function UpdatePatientService() {
    }
    UpdatePatientService.prototype.execute = function (cpf, data) {
        return __awaiter(this, void 0, void 0, function () {
            var patientsRepository, updatedPatient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        patientsRepository = (0, typeorm_1.getCustomRepository)(patients_repository_1.default);
                        return [4 /*yield*/, patientsRepository.update(cpf, data)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, patientsRepository.findOne(cpf)];
                    case 2:
                        updatedPatient = _a.sent();
                        if (!updatedPatient) {
                            throw new errors_1.default("This patient does not exist", 404);
                        }
                        return [2 /*return*/, updatedPatient];
                }
            });
        });
    };
    return UpdatePatientService;
}());
exports.UpdatePatientService = UpdatePatientService;
var DeletePatientService = /** @class */ (function () {
    function DeletePatientService() {
    }
    DeletePatientService.prototype.execute = function (cpf) {
        return __awaiter(this, void 0, void 0, function () {
            var patientsRepository, patientToDelete, deletedPatient;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        patientsRepository = (0, typeorm_1.getCustomRepository)(patients_repository_1.default);
                        return [4 /*yield*/, patientsRepository.findOne(cpf)];
                    case 1:
                        patientToDelete = _a.sent();
                        if (!patientToDelete) {
                            throw new errors_1.default("This patient does not exist", 404);
                        }
                        return [4 /*yield*/, patientsRepository.remove(patientToDelete)];
                    case 2:
                        deletedPatient = _a.sent();
                        return [2 /*return*/, deletedPatient];
                }
            });
        });
    };
    return DeletePatientService;
}());
exports.DeletePatientService = DeletePatientService;
//# sourceMappingURL=patient.service.js.map