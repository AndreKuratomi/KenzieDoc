"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
var typeorm_1 = require("typeorm");
var _1 = require(".");
var Appointment = /** @class */ (function () {
    function Appointment(professional, patient, date, finished) {
        this.professional = professional;
        this.patient = patient;
        this.date = date;
        this.finished = finished;
        this.prescription = "";
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
        __metadata("design:type", String)
    ], Appointment.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return _1.Professional; }, function (professional) { return professional.appointments; }, {
            cascade: true,
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", _1.Professional)
    ], Appointment.prototype, "professional", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return _1.Patient; }, function (patient) { return patient.appointments; }, {
            cascade: true,
        }),
        (0, typeorm_1.JoinColumn)(),
        __metadata("design:type", _1.Patient)
    ], Appointment.prototype, "patient", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Date)
    ], Appointment.prototype, "date", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Appointment.prototype, "prescription", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Appointment.prototype, "finished", void 0);
    Appointment = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [_1.Professional,
            _1.Patient,
            Date, Boolean])
    ], Appointment);
    return Appointment;
}());
exports.Appointment = Appointment;
//# sourceMappingURL=appointments.js.map