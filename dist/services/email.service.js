"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.sendPrescription = exports.sendCancelationEmail = exports.sendAppointmentEmail = exports.createMail = exports.attachmentTemplateOptions = exports.attachmentEmailTemplateOptions = exports.mailTemplateOptions = exports.mailOptions = exports.transport = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
var tpath = __importStar(require("path"));
exports.transport = nodemailer_1.default.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "fd74675a5cf82b",
        pass: "b256e96e5d2d12"
    }
});
var mailOptions = function (to, subject, text) {
    return {
        from: 'no-reply@kenziedoc.com',
        to: to,
        subject: subject,
        text: text,
    };
};
exports.mailOptions = mailOptions;
var mailTemplateOptions = function (to, subject, template, context) {
    return {
        from: 'no-reply@kenziedoc.com',
        to: to,
        subject: subject,
        template: template,
        context: context
    };
};
exports.mailTemplateOptions = mailTemplateOptions;
var attachmentEmailTemplateOptions = function (to, subject, template, context, attachments) {
    return {
        from: 'no-reply@kenziedoc.com',
        to: to,
        subject: subject,
        template: template,
        context: context,
        attachments: attachments,
    };
};
exports.attachmentEmailTemplateOptions = attachmentEmailTemplateOptions;
var attachmentTemplateOptions = function (to, subject, template, context) {
    return {
        from: 'no-reply@kenziedoc.com',
        to: to,
        subject: subject,
        template: template,
        context: context,
        attachments: [{
                path: tpath.resolve(__dirname, '..', 'utils', 'temp', 'receita.pdf')
            }],
    };
};
exports.attachmentTemplateOptions = attachmentTemplateOptions;
var createMail = function (body) {
    var to = body.to, subject = body.subject, text = body.text;
    var email = (0, exports.mailOptions)(to, subject, text);
    console.log(email);
    exports.transport.sendMail(email, function (err, info) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(info);
        }
    });
    return email;
};
exports.createMail = createMail;
var sendAppointmentEmail = function (user, medic, email, specialty, date, hour) { return __awaiter(void 0, void 0, void 0, function () {
    var subject, handlebarOption, message;
    return __generator(this, function (_a) {
        subject = "Marcação de consulta";
        handlebarOption = {
            viewEngine: {
                partialsDir: tpath.resolve(__dirname, '..', 'templates'),
                defaultLayout: undefined
            },
            viewPath: tpath.resolve(__dirname, '..', 'templates')
        };
        exports.transport.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOption));
        date = date.split("-").reverse().join("-");
        message = (0, exports.mailTemplateOptions)(email, subject, 'appointment', {
            user: user,
            medic: medic,
            specialty: specialty,
            date: date,
            hour: hour,
        });
        exports.transport.sendMail(message, function (err, info) {
            if (err) {
                return console.log(err);
            }
            else {
                console.log(info);
            }
        });
        return [2 /*return*/];
    });
}); };
exports.sendAppointmentEmail = sendAppointmentEmail;
var sendCancelationEmail = function (user, medic, email, specialty, date, hour) { return __awaiter(void 0, void 0, void 0, function () {
    var subject, handlebarOption, message;
    return __generator(this, function (_a) {
        subject = "Cancelamento de consulta";
        handlebarOption = {
            viewEngine: {
                partialsDir: tpath.resolve(__dirname, '..', 'templates'),
                defaultLayout: undefined
            },
            viewPath: tpath.resolve(__dirname, '..', 'templates')
        };
        exports.transport.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOption));
        specialty = specialty.toLowerCase();
        message = (0, exports.mailTemplateOptions)(email, subject, 'cancel.appointment', {
            user: user,
            medic: medic,
            specialty: specialty,
            date: date,
            hour: hour,
        });
        exports.transport.sendMail(message, function (err, info) {
            if (err) {
                return console.log(err);
            }
            else {
                console.log(info);
            }
        });
        return [2 /*return*/];
    });
}); };
exports.sendCancelationEmail = sendCancelationEmail;
var sendPrescription = function (email, user, medic, specialty) { return __awaiter(void 0, void 0, void 0, function () {
    var subject, handlebarOption, message;
    return __generator(this, function (_a) {
        subject = "Prescrição Médica";
        handlebarOption = {
            viewEngine: {
                partialsDir: tpath.resolve(__dirname, '..', 'templates'),
                defaultLayout: undefined
            },
            viewPath: tpath.resolve(__dirname, '..', 'templates')
        };
        exports.transport.use('compile', (0, nodemailer_express_handlebars_1.default)(handlebarOption));
        specialty = specialty.toLocaleLowerCase();
        message = (0, exports.attachmentTemplateOptions)(email, subject, 'prescription', {
            user: user,
            medic: medic,
            specialty: specialty,
        });
        exports.transport.sendMail(message, function (err, info) {
            if (err) {
                return console.log(err);
            }
            else {
                console.log(info);
            }
        });
        return [2 /*return*/];
    });
}); };
exports.sendPrescription = sendPrescription;
//# sourceMappingURL=email.service.js.map