"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
var errors_1 = __importDefault(require("../utils/errors"));
var handleError = function (error, req, res, next) {
    if (error instanceof errors_1.default) {
        return res.status(error.statusCode).json({ error: error.message });
    }
    res.status(500).json({ error: "Internal server error!" });
};
exports.handleError = handleError;
//# sourceMappingURL=errors.middlewares.js.map