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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeletePatientController = exports.UpdatePatientController = exports.PatientsListController = exports.CreatePatientController = void 0;
var patient_service_1 = require("../services/patient.service");
var CreatePatientController = /** @class */ (function () {
    function CreatePatientController() {
    }
    CreatePatientController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var createPatientService, data, patient, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createPatientService = new patient_service_1.CreatePatientService();
                        data = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, createPatientService.execute(data)];
                    case 2:
                        patient = _a.sent();
                        return [2 /*return*/, res.status(201).send(patient)];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_1.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CreatePatientController;
}());
exports.CreatePatientController = CreatePatientController;
var PatientsListController = /** @class */ (function () {
    function PatientsListController() {
    }
    PatientsListController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var listPatientService, patient, listWithoutPassword, eachPatient, i, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        listPatientService = new patient_service_1.PatientsListService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, listPatientService.execute()];
                    case 2:
                        patient = _a.sent();
                        listWithoutPassword = [];
                        eachPatient = {};
                        for (i in patient) {
                            eachPatient = {
                                cpf: patient[i].cpf,
                                name: patient[i].name,
                                age: patient[i].age,
                                sex: patient[i].sex,
                                email: patient[i].email,
                                phone: patient[i].phone,
                                health_plan: patient[i].health_plan,
                            };
                            listWithoutPassword.push(eachPatient);
                        }
                        return [2 /*return*/, res.json(listWithoutPassword)];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_2.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return PatientsListController;
}());
exports.PatientsListController = PatientsListController;
var UpdatePatientController = /** @class */ (function () {
    function UpdatePatientController() {
    }
    UpdatePatientController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updatePatientService, cpf, updatedPatient, data_password, dataWithoutPassword, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updatePatientService = new patient_service_1.UpdatePatientService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        cpf = req.params.cpf;
                        return [4 /*yield*/, updatePatientService.execute(cpf, req.body)];
                    case 2:
                        updatedPatient = _a.sent();
                        data_password = updatedPatient.password, dataWithoutPassword = __rest(updatedPatient, ["password"]);
                        return [2 /*return*/, res.status(201).json(dataWithoutPassword)];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_3.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UpdatePatientController;
}());
exports.UpdatePatientController = UpdatePatientController;
var DeletePatientController = /** @class */ (function () {
    function DeletePatientController() {
    }
    DeletePatientController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var deletePatientService, cpf, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deletePatientService = new patient_service_1.DeletePatientService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        cpf = req.params.cpf;
                        return [4 /*yield*/, deletePatientService.execute(cpf)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.sendStatus(204)];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_4.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return DeletePatientController;
}());
exports.DeletePatientController = DeletePatientController;
//# sourceMappingURL=patient.controller.js.map