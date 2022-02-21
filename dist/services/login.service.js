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
exports.LoginUserService = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var typeorm_1 = require("typeorm");
var admin_repository_1 = __importDefault(require("../repositories/admin.repository"));
var patients_repository_1 = __importDefault(require("../repositories/patients.repository"));
var professionals_repository_1 = __importDefault(require("../repositories/professionals.repository"));
var errors_1 = __importDefault(require("../utils/errors"));
var LoginUserService = /** @class */ (function () {
    function LoginUserService() {
    }
    LoginUserService.prototype.execute = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var patientRepository, patient, professionalRepository, professional, adminRepository, admin, token, token, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!email || !password) {
                            throw new errors_1.default("One or more of the body fields is missing!", 400);
                        }
                        if (typeof email !== "string" || typeof password !== "string") {
                            throw new errors_1.default("This field must be typeof string!", 400);
                        }
                        patientRepository = (0, typeorm_1.getCustomRepository)(patients_repository_1.default);
                        return [4 /*yield*/, patientRepository.findByEmail(email)];
                    case 1:
                        patient = _a.sent();
                        professionalRepository = (0, typeorm_1.getCustomRepository)(professionals_repository_1.default);
                        return [4 /*yield*/, professionalRepository.findByEmail(email)];
                    case 2:
                        professional = _a.sent();
                        adminRepository = (0, typeorm_1.getCustomRepository)(admin_repository_1.default);
                        return [4 /*yield*/, adminRepository.findByEmail(email)];
                    case 3:
                        admin = _a.sent();
                        if (patient) {
                            if (!bcryptjs_1.default.compareSync(password, patient.password)) {
                                // return { message: "Wrong email/password" };
                                throw new errors_1.default("Wrong email/password", 400);
                            }
                            token = jsonwebtoken_1.default.sign({ cpf: patient.cpf, name: patient.name, email: patient.email }, process.env.SECRET, {
                                expiresIn: "1d",
                            });
                            return [2 /*return*/, token];
                        }
                        else if (professional) {
                            if (!bcryptjs_1.default.compareSync(password, professional.password)) {
                                // return { message: "Wrong email/password" };
                                throw new errors_1.default("Wrong email/password", 400);
                            }
                            token = jsonwebtoken_1.default.sign({
                                council_number: professional.council_number,
                                name: professional.name,
                                email: professional.email,
                                isProf: professional.isProf,
                            }, process.env.SECRET, {
                                expiresIn: "1d",
                            });
                            return [2 /*return*/, token];
                        }
                        else if (admin) {
                            if (!bcryptjs_1.default.compareSync(password, admin.password)) {
                                // return { message: "Wrong email/password" };
                                throw new errors_1.default("Wrong email/password", 400);
                            }
                            token = jsonwebtoken_1.default.sign({
                                id: admin.id,
                                email: admin.email,
                                name: admin.name,
                                isAdm: admin.isAdm,
                            }, process.env.SECRET, {
                                expiresIn: "1d",
                            });
                            return [2 /*return*/, token];
                        }
                        //Verify Admin
                        // return { message: "User don't exist" };
                        throw new errors_1.default("User don't exist", 404);
                }
            });
        });
    };
    return LoginUserService;
}());
exports.LoginUserService = LoginUserService;
//# sourceMappingURL=login.service.js.map