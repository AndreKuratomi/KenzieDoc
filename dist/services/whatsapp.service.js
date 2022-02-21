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
exports.sendCancelationWhatsapp = exports.sendAppointmentWhatsapp = void 0;
var puppeteer_1 = __importDefault(require("puppeteer"));
var sendAppointmentWhatsapp = function (user, medic, phone, specialty, date) { return __awaiter(void 0, void 0, void 0, function () {
    var justDate, justHour, message;
    return __generator(this, function (_a) {
        date = date.split("T").join(" ").split(" ");
        justDate = date[0].split("-").reverse().join("/");
        justHour = date[1].split("Z").join("");
        message = "  \n\n      \u2705  *Confirma\u00E7\u00E3o de agendamento de consulta* %0A%0A\n    *Paciente:* ".concat(user, " %0A\n    *Profissional:* ").concat(medic, " %0A\n    *Especialidade:* ").concat(specialty, " %0A\n    *Data:* ").concat(justDate, " %0A\n    *Hora:* ").concat(justHour, " %0A\n    *Local:* Cl\u00EDnica Kenzie Doc %0A\n    *Endere\u00E7o:* R. General Mario Tourinho, 1733 %0A%0A\n    *Para reagendar/cancelar a consulta, entre em contato com a Kenzie Doc.* %0A\n  \n  ");
        runWhatsApp(phone, message);
        return [2 /*return*/];
    });
}); };
exports.sendAppointmentWhatsapp = sendAppointmentWhatsapp;
var sendCancelationWhatsapp = function (user, medic, phone, specialty) { return __awaiter(void 0, void 0, void 0, function () {
    var message;
    return __generator(this, function (_a) {
        message = "  \n\n    \u274C  *Aviso de cancelamento de consulta* %0A%0A\n    *Informamos o cancelamento da seguinte consulta:* %0A\n    *Paciente:* ".concat(user, " %0A\n    *Profissional:* ").concat(medic, " - ").concat(specialty, " %0A\n    *Para agendar uma nova consulta, entre em contato com a Kenzie Doc.* %0A\n    ");
        runWhatsApp(phone, message);
        return [2 /*return*/];
    });
}); };
exports.sendCancelationWhatsapp = sendCancelationWhatsapp;
function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
}
var runWhatsApp = function (phone, message) { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                phone = ["+55".concat(phone)];
                return [4 /*yield*/, puppeteer_1.default.launch({ headless: false, args: ["--no-sandbox"] })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _a.sent();
                return [4 /*yield*/, page.goto("https://web.whatsapp.com/send?phone=".concat(phone[0], "&text=").concat(message, " "))];
            case 3:
                _a.sent();
                return [4 /*yield*/, delay(20000)];
            case 4:
                _a.sent();
                console.log("Conectado com sucesso!");
                return [4 /*yield*/, page.click("span[data-testid='send']")];
            case 5:
                _a.sent();
                return [4 /*yield*/, delay(20000)];
            case 6:
                _a.sent();
                index = 1;
                _a.label = 7;
            case 7:
                if (!(index < phone.length)) return [3 /*break*/, 13];
                return [4 /*yield*/, page.goto("https://web.whatsapp.com/send?phone=".concat(phone[index], "&text=").concat(message, " "))];
            case 8:
                _a.sent();
                return [4 /*yield*/, delay(20000)];
            case 9:
                _a.sent();
                console.log("Enviando mensagem");
                return [4 /*yield*/, page.click("span[data-testid='send']")];
            case 10:
                _a.sent();
                return [4 /*yield*/, delay(20000)];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12:
                index++;
                return [3 /*break*/, 7];
            case 13: return [4 /*yield*/, browser.close()];
            case 14:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=whatsapp.service.js.map