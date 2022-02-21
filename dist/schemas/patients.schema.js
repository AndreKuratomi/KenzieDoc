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
exports.PatientSchema = void 0;
var yup = __importStar(require("yup"));
exports.PatientSchema = yup.object().shape({
    cpf: yup
        .string()
        .typeError("The field 'cpf' must be typeof string!")
        .strict(true)
        .required("'CPF' is a required field!")
        .length(11, "CPF must have 11 digits!"),
    name: yup
        .string()
        .typeError("The field 'name' must be typeof string!")
        .strict(true)
        .required("'name' is a required field!"),
    age: yup
        .number()
        .typeError("The field 'age' must be typeof number!")
        .strict(true)
        .required("'age' is a required field!")
        .positive()
        .integer(),
    sex: yup
        .string()
        .typeError("The field 'sex' must be typeof string!")
        .strict(true)
        .required("'sex' is a required field!"),
    email: yup
        .string()
        .email("Invalid email. Correct format example: 'email@email.com'")
        .required("'email' is a required field!"),
    password: yup
        .string()
        .typeError("The field 'password' must be typeof string!")
        .strict(true)
        .required("'password' is a required field!")
        .min(4, "Minimun 4 digits for password!"),
    phone: yup
        .string()
        .typeError("The field 'phone' must be typeof string!")
        .strict(true)
        .required("'phone' is a required field!")
        .length(11, "Phone field must have 11 digits!"),
    health_plan: yup
        .string()
        .typeError("The field 'health_plan' must be typeof string!")
        .strict(true)
        .required("'healph_plan' is a required field!"),
});
//# sourceMappingURL=patients.schema.js.map