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
exports.Professional = void 0;
var typeorm_1 = require("typeorm");
var _1 = require(".");
var Professional = /** @class */ (function () {
    function Professional(council_number, name, email, phone, password, specialty, address) {
        this.council_number = council_number;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.specialty = specialty;
        this.address = address;
        this.isProf = true;
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)({ unique: true }),
        __metadata("design:type", String)
    ], Professional.prototype, "council_number", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Professional.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ unique: true }),
        __metadata("design:type", String)
    ], Professional.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Professional.prototype, "phone", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Professional.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Professional.prototype, "specialty", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Professional.prototype, "address", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return _1.Appointment; }, function (ap) { return ap.professional; }),
        __metadata("design:type", Array)
    ], Professional.prototype, "appointments", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Professional.prototype, "isProf", void 0);
    Professional = __decorate([
        (0, typeorm_1.Entity)(),
        __metadata("design:paramtypes", [String, String, String, String, String, String, String])
    ], Professional);
    return Professional;
}());
exports.Professional = Professional;
//# sourceMappingURL=professionals.entity.js.map