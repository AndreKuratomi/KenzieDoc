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
exports.ProfessionalBySpecialtyController = exports.ProfessionalByIdController = exports.DeleteProfessionalController = exports.UpdateProfessionalController = exports.ProfessionalsListController = exports.CreateProfessionalController = void 0;
var professional_service_1 = require("../services/professional.service");
var functions_1 = require("../utils/functions");
var CreateProfessionalController = /** @class */ (function () {
    function CreateProfessionalController() {
    }
    CreateProfessionalController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var createProfessionalService, data, user, password, noPasswordData, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        createProfessionalService = new professional_service_1.CreateProfessionalService();
                        data = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, createProfessionalService.execute(data)];
                    case 2:
                        user = _a.sent();
                        password = user.password, noPasswordData = __rest(user, ["password"]);
                        return [2 /*return*/, res.status(201).json(noPasswordData)];
                    case 3:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_1.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CreateProfessionalController;
}());
exports.CreateProfessionalController = CreateProfessionalController;
var ProfessionalsListController = /** @class */ (function () {
    function ProfessionalsListController() {
    }
    ProfessionalsListController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var professionalsListService, list, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        professionalsListService = new professional_service_1.ProfessionalsListService();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, professionalsListService.execute()];
                    case 2:
                        list = _a.sent();
                        return [2 /*return*/, res.status(200).json(list)];
                    case 3:
                        err_2 = _a.sent();
                        console.log(err_2);
                        return [2 /*return*/, res.status(400).json({ message: err_2.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProfessionalsListController;
}());
exports.ProfessionalsListController = ProfessionalsListController;
var UpdateProfessionalController = /** @class */ (function () {
    function UpdateProfessionalController() {
    }
    UpdateProfessionalController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var updateProfessionalService, id, data, user, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updateProfessionalService = new professional_service_1.UpdateProfessionalService();
                        id = req.params.id;
                        data = req.body;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, updateProfessionalService.execute(id, data)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, res.status(200).json(user)];
                    case 3:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_3.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UpdateProfessionalController;
}());
exports.UpdateProfessionalController = UpdateProfessionalController;
var DeleteProfessionalController = /** @class */ (function () {
    function DeleteProfessionalController() {
    }
    DeleteProfessionalController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var deleteProfessionalService, id, user, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        deleteProfessionalService = new professional_service_1.DeleteProfessionalService();
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, deleteProfessionalService.execute(id)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, res.status(200).json(user)];
                    case 3:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_4.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return DeleteProfessionalController;
}());
exports.DeleteProfessionalController = DeleteProfessionalController;
var ProfessionalByIdController = /** @class */ (function () {
    function ProfessionalByIdController() {
    }
    ProfessionalByIdController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var professionalByIdService, id, professional, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        professionalByIdService = new professional_service_1.ProfessionalByIdService();
                        id = req.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, professionalByIdService.execute(id)];
                    case 2:
                        professional = _a.sent();
                        return [2 /*return*/, res.status(200).json(professional)];
                    case 3:
                        err_5 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_5.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProfessionalByIdController;
}());
exports.ProfessionalByIdController = ProfessionalByIdController;
var ProfessionalBySpecialtyController = /** @class */ (function () {
    function ProfessionalBySpecialtyController() {
    }
    ProfessionalBySpecialtyController.prototype.handle = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var professionalBySpecialtyService, specialty, specialtyList, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        professionalBySpecialtyService = new professional_service_1.ProfessionalBySpecialtyService();
                        specialty = req.params.specialty;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, professionalBySpecialtyService.execute((0, functions_1.title)(specialty))];
                    case 2:
                        specialtyList = _a.sent();
                        return [2 /*return*/, res.status(200).json(specialtyList)];
                    case 3:
                        err_6 = _a.sent();
                        return [2 /*return*/, res.status(400).json({ message: err_6.message })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return ProfessionalBySpecialtyController;
}());
exports.ProfessionalBySpecialtyController = ProfessionalBySpecialtyController;
//# sourceMappingURL=professional.controller.js.map