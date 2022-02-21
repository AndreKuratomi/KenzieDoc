"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var app_1 = __importDefault(require("./app"));
(0, typeorm_1.createConnection)()
    .then(function () {
    console.log("Database connected!");
    app_1.default.listen(process.env.PORT || 4000, function () {
        console.log("App started!");
    });
})
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=server.js.map