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
exports.Patient = void 0;
var typeorm_1 = require("typeorm");
var _1 = require(".");
var Patient = /** @class */ (function () {
    function Patient(cpf, name, age, sex, email, password, phone, health_plan) {
        this.cpf = cpf;
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.health_plan = health_plan;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Patient.prototype, "cpf", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Patient.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Patient.prototype, "age", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Patient.prototype, "sex", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], Patient.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Patient.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Patient.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Patient.prototype, "health_plan", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return _1.Appointment; }, function (ap) { return ap.patient; }),
        __metadata("design:type", Array)
    ], Patient.prototype, "appointments", void 0);
    Patient = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String, Number, String, String, String, String, String])
    ], Patient);
    return Patient;
}());
exports.Patient = Patient;
//# sourceMappingURL=patients.entity.js.map