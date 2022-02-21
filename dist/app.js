"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = __importDefault(require("./routes"));
var errors_middlewares_1 = require("./middlewares/errors.middlewares");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var swagger_js_1 = __importDefault(require("./swagger.js"));
var cors_1 = __importDefault(require("cors"));
var app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_js_1.default));
app.use(routes_1.default);
app.use(errors_middlewares_1.handleError);
exports.default = app;
//# sourceMappingURL=app.js.map