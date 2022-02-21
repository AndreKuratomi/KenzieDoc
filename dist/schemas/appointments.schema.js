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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSchema = void 0;
var yup = __importStar(require("yup"));
exports.AppointmentSchema = yup.object().shape({
    patient: yup
        .string()
        .typeError("The field 'patient' must be typeof string!")
        .strict(true)
        .required("'patient' is a required field!")
        .length(11, "CPF must have 11 digits!"),
    professional: yup
        .string()
        .typeError("The field 'professional' must be typeof string!")
        .strict(true)
        .required("'professional' is a required field!")
        .matches(/^([0-9]){3,5}\-([aA-zZ]){2}$/, "Invalid field 'council_number'. Correct example: '00000-xx'"),
    date: yup.date().required("'date' is a required field!"),
    finished: yup
        .boolean()
        .typeError("The field 'finished' must be typeof boolean!")
        .strict(true)
        .required("'finished' is a required field!"),
});
//# sourceMappingURL=appointments.schema.js.map