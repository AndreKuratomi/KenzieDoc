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
exports.ProfessionalSchema = void 0;
var yup = __importStar(require("yup"));
exports.ProfessionalSchema = yup.object().shape({
    council_number: yup
        .string()
        .typeError("The field 'council_number' must be typeof string!")
        .strict(true)
        .matches(/^([0-9]){3,5}\-([aA-zZ]){2}$/, "Invalid field 'council_number'. Correct example: '00000-xx'")
        .required("'CPF' is a required field!"),
    name: yup
        .string()
        .typeError("The field 'name' must be typeof string!")
        .strict(true)
        .required("'name' is a required field!"),
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
        .length(11, "Phone must have 11 digits!"),
    specialty: yup
        .string()
        .typeError("The field 'specialty' must be typeof string!")
        .strict(true)
        .required("'specialty' is a required field!"),
    address: yup
        .string()
        .typeError("The field 'address' must be typeof string!")
        .strict(true)
        .required("'address' is a required field!"),
});
//# sourceMappingURL=professionals.schema.js.map