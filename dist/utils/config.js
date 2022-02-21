"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nodeEnv = exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.config = {
    secret: process.env.SECRET_KEY,
    expiresIn: process.env.EXPIRES_IN,
};
exports.nodeEnv = process.env.NODE_ENV;
//# sourceMappingURL=config.js.map