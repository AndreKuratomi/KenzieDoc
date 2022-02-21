"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUUID = exports.verifyAdmin = exports.verifyAccount = exports.authenticated = void 0;
var authenticate_user_middletare_1 = __importDefault(require("./authenticate.user.middletare"));
exports.authenticated = authenticate_user_middletare_1.default;
var uuid_middleware_1 = __importDefault(require("./uuid.middleware"));
exports.isValidUUID = uuid_middleware_1.default;
var verify_account_middleware_1 = __importDefault(require("./verify.account.middleware"));
exports.verifyAccount = verify_account_middleware_1.default;
var verify_admin_middleware_1 = __importDefault(require("./verify.admin.middleware"));
exports.verifyAdmin = verify_admin_middleware_1.default;
//# sourceMappingURL=index.middleware.js.map