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
exports.ProfessionalBySpecialtyService = exports.ProfessionalByIdService = exports.DeleteProfessionalService = exports.UpdateProfessionalService = exports.ProfessionalsListService = exports.CreateProfessionalService = void 0;
var professionals_repository_1 = __importDefault(require("../repositories/professionals.repository"));
var typeorm_1 = require("typeorm");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var functions_1 = require("../utils/functions");
var CreateProfessionalService = /** @class */ (function () {
    function CreateProfessionalService() {
    }
    CreateProfessionalService.prototype.execute = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var professionalsRepository, _a, professionalExists, emailExists, newProfessional;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        professionalsRepository = (0, typeorm_1.getCustomRepository)(professionals_repository_1.default);
                        _a = data;
                        return [4 /*yield*/, bcryptjs_1.default.hash(data.password, 10)];
                    case 1:
                        _a.password = _b.sent();
                        data.council_number = data.council_number.toUpperCase();
                        data.name = (0, functions_1.title)(data.name);
                        data.address = (0, functions_1.title)(data.address);
                        data.specialty = (0, functions_1.title)(data.specialty);
                        return [4 /*yield*/, professionalsRepository.findOne(data.council_number)];
                    case 2:
                        professionalExists = _b.sent();
                        return [4 /*yield*/, professionalsRepository.findOne({
                                where: { email: data.email },
                            })];
                    case 3:
                        emailExists = _b.sent();
                        if (professionalExists) {
                            throw new Error("A professional with this council number already exists");
                        }
                        if (emailExists) {
                            throw new Error("A professional with this email already exists");
                        }
                        newProfessional = professionalsRepository.create(data);
                        return [4 /*yield*/, professionalsRepository.save(newProfessional)];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, newProfessional];
                }
            });
        });
    };
    return CreateProfessionalService;
}());
exports.CreateProfessionalService = CreateProfessionalService;
var ProfessionalsListService = /** @class */ (function () {
    function ProfessionalsListService() {
    }
    ProfessionalsListService.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var professionalsRepository, professionalsList, nonSensitiveList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        professionalsRepository = (0, typeorm_1.getCustomRepository)(professionals_repository_1.default);
                        return [4 /*yield*/, professionalsRepository.find()];
                    case 1:
                        professionalsList = _a.sent();
                        nonSensitiveList = (0, functions_1.onlyNonSensitive)(professionalsList);
                        return [2 /*return*/, nonSensitiveList];
                }
            });
        });
    };
    return ProfessionalsListService;
}());
exports.ProfessionalsListService = ProfessionalsListService;
var UpdateProfessionalService = /** @class */ (function () {
    function UpdateProfessionalService() {
    }
    UpdateProfessionalService.prototype.execute = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var professionalsRepository, upperId, updatedProfessional;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        professionalsRepository = (0, typeorm_1.getCustomRepository)(professionals_repository_1.default);
                        upperId = id.toUpperCase();
                        (0, functions_1.checkUpdateProfessional)(data);
                        return [4 /*yield*/, professionalsRepository.update(upperId, data)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, professionalsRepository.findOne(upperId)];
                    case 2:
                        updatedProfessional = _a.sent();
                        if (!updatedProfessional) {
                            throw new Error("This professional does not exist");
                        }
                        return [2 /*return*/, updatedProfessional];
                }
            });
        });
    };
    return UpdateProfessionalService;
}());
exports.UpdateProfessionalService = UpdateProfessionalService;
var DeleteProfessionalService = /** @class */ (function () {
    function DeleteProfessionalService() {
    }
    DeleteProfessionalService.prototype.execute = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var professionalsRepository, profToDelete, deletedProfessional;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        professionalsRepository = (0, typeorm_1.getCustomRepository)(professionals_repository_1.default);
                        return [4 /*yield*/, professionalsRepository.findOne(id)];
                    case 1:
                        profToDelete = _a.sent();
                        if (!profToDelete) {
                            throw new Error("This professional does not exist");
                        }
                        return [4 /*yield*/, professionalsRepository.remove(profToDelete)];
                    case 2:
                        deletedProfessional = _a.sent();
                        return [2 /*return*/, deletedProfessional];
                }
            });
        });
    };
    return DeleteProfessionalService;
}());
exports.DeleteProfessionalService = DeleteProfessionalService;
var ProfessionalByIdService = /** @class */ (function () {
    function ProfessionalByIdService() {
    }
    ProfessionalByIdService.prototype.execute = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var professionalsRepository, professional, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        professionalsRepository = (0, typeorm_1.getCustomRepository)(professionals_repository_1.default);
                        return [4 /*yield*/, professionalsRepository.findOne(id, {
                                relations: ["appointments", "appointments.patient"],
                            })];
                    case 1:
                        professional = _a.sent();
                        if (!professional) {
                            throw new Error("This professional does not exist");
                        }
                        result = {
                            council_number: professional.council_number,
                            name: professional.name,
                            email: professional.email,
                            phone: professional.phone,
                            specialty: professional.specialty,
                            address: professional.address,
                            password: professional.password,
                            appointments: [],
                        };
                        professional.appointments.forEach(function (appointment) {
                            var newApp = {
                                date: appointment.date,
                                patient: {
                                    name: appointment.patient.name,
                                    age: appointment.patient.age,
                                    sex: appointment.patient.sex,
                                    health_plan: appointment.patient.health_plan,
                                },
                            };
                            result.appointments.push(newApp);
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return ProfessionalByIdService;
}());
exports.ProfessionalByIdService = ProfessionalByIdService;
var ProfessionalBySpecialtyService = /** @class */ (function () {
    function ProfessionalBySpecialtyService() {
    }
    ProfessionalBySpecialtyService.prototype.execute = function (specialty) {
        return __awaiter(this, void 0, void 0, function () {
            var professionalsRepository, specialtyList, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        professionalsRepository = (0, typeorm_1.getCustomRepository)(professionals_repository_1.default);
                        return [4 /*yield*/, professionalsRepository.find({
                                where: { specialty: specialty },
                            })];
                    case 1:
                        specialtyList = _a.sent();
                        result = {
                            specialty: specialty,
                            professionals: (0, functions_1.formatProfessionalSpecialty)(specialtyList),
                        };
                        return [2 /*return*/, result];
                }
            });
        });
    };
    return ProfessionalBySpecialtyService;
}());
exports.ProfessionalBySpecialtyService = ProfessionalBySpecialtyService;
//# sourceMappingURL=professional.service.js.map