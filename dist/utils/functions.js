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
exports.formatProfessionalSpecialty = exports.checkUpdateProfessional = exports.onlyNonSensitive = exports.formatWaitList = exports.formatAppointmentsTomorrow = exports.formatProfessionalAppointment = exports.formatPatientAppointment = exports.title = void 0;
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var title = function (str) {
    var arr = str.split(" ");
    var result = "";
    arr.forEach(function (str, i) {
        result += str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
        if (i < arr.length - 1) {
            result += " ";
        }
    });
    return result;
};
exports.title = title;
var formatPatientAppointment = function (appointments) {
    var result = [];
    appointments.forEach(function (appointment) {
        var app = {
            id: appointment.id,
            date: appointment.date,
            finished: appointment.finished,
            patient_name: appointment.patient.name,
            professional: {
                name: appointment.professional.name,
                specialty: appointment.professional.specialty,
                email: appointment.professional.email,
                council_number: appointment.professional.council_number,
            },
        };
        result.push(app);
    });
    return result;
};
exports.formatPatientAppointment = formatPatientAppointment;
var formatProfessionalAppointment = function (appointments) {
    var result = [];
    appointments.forEach(function (appointment) {
        var app = {
            id: appointment.id,
            date: appointment.date,
            finished: appointment.finished,
            professional_name: appointment.professional.name,
            patient: {
                name: appointment.patient.name,
                age: appointment.patient.age,
                sex: appointment.patient.sex,
                health_plan: appointment.patient.health_plan,
            },
        };
        result.push(app);
    });
    return result;
};
exports.formatProfessionalAppointment = formatProfessionalAppointment;
var formatAppointmentsTomorrow = function (appointments) {
    var result = [];
    appointments.forEach(function (appointment) {
        var app = {
            id: appointment.id,
            date: appointment.date,
            finished: appointment.finished,
            professional: {
                name: appointment.professional.name,
                council_number: appointment.professional.council_number,
                phone: appointment.professional.phone,
            },
            patient: {
                name: appointment.patient.name,
                cpf: appointment.patient.cpf,
                phone: appointment.patient.phone,
            },
        };
        result.push(app);
    });
    return result;
};
exports.formatAppointmentsTomorrow = formatAppointmentsTomorrow;
var formatWaitList = function (appointments) {
    if (appointments[0] === undefined) {
        return { message: "There is no wait list at the moment" };
    }
    var doctor = appointments[0].professional;
    var result = {
        message: "The wait list for ".concat(doctor.name, " is of ").concat(appointments.length, " patients"),
        size: appointments.length,
        professional_email: doctor.email,
        appointments: [],
    };
    appointments.forEach(function (appointment) {
        var app = {
            id: appointment.id,
            date: appointment.date,
            patient: {
                name: appointment.patient.name,
                phone: appointment.patient.phone,
                email: appointment.patient.email,
            },
        };
        result.appointments.push(app);
    });
    return result;
};
exports.formatWaitList = formatWaitList;
var onlyNonSensitive = function (repo) {
    var nonSensitiveDataList = [];
    for (var count = 0; count < repo.length; count++) {
        var _a = repo[count], email_data = _a.email, password_data = _a.password, phone_data = _a.phone, address_data = _a.address, nonSensitiveData = __rest(_a, ["email", "password", "phone", "address"]);
        nonSensitiveDataList.push(nonSensitiveData);
    }
    return nonSensitiveDataList;
};
exports.onlyNonSensitive = onlyNonSensitive;
var checkUpdateProfessional = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (data.council_number) {
                    throw new Error("You can not change your council number");
                }
                if (!data.password) return [3 /*break*/, 2];
                _a = data;
                return [4 /*yield*/, bcryptjs_1.default.hash(data.password, 10)];
            case 1:
                _a.password = _b.sent();
                _b.label = 2;
            case 2:
                if (data.name) {
                    data.name = (0, exports.title)(data.name);
                }
                if (data.address) {
                    data.address = (0, exports.title)(data.address);
                }
                if (data.specialty) {
                    data.specialty = (0, exports.title)(data.specialty);
                }
                if (data.email) {
                    if (data.email.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/) ==
                        null) {
                        throw new Error("Invalid email");
                    }
                }
                if (data.phone) {
                    if (data.phone.match(/\(\d{2,}\)\d{4,}\-\d{4}/) == null) {
                        throw new Error("Invalid phone number. Correct format: (xx)xxxxx-xxxx");
                    }
                }
                return [2 /*return*/];
        }
    });
}); };
exports.checkUpdateProfessional = checkUpdateProfessional;
var formatProfessionalSpecialty = function (professionals) {
    var specialtyList = [];
    professionals.forEach(function (prof) {
        specialtyList.push({
            council_number: prof.council_number,
            name: prof.name,
        });
    });
    return specialtyList;
};
exports.formatProfessionalSpecialty = formatProfessionalSpecialty;
//# sourceMappingURL=functions.js.map