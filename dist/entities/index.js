"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = exports.Appointment = exports.Patient = exports.Professional = void 0;
var professionals_entity_1 = require("./professionals.entity");
Object.defineProperty(exports, "Professional", { enumerable: true, get: function () { return professionals_entity_1.Professional; } });
var patients_entity_1 = require("./patients.entity");
Object.defineProperty(exports, "Patient", { enumerable: true, get: function () { return patients_entity_1.Patient; } });
var appointments_1 = require("./appointments");
Object.defineProperty(exports, "Appointment", { enumerable: true, get: function () { return appointments_1.Appointment; } });
var admin_1 = require("./admin");
Object.defineProperty(exports, "Admin", { enumerable: true, get: function () { return admin_1.Admin; } });
//# sourceMappingURL=index.js.map