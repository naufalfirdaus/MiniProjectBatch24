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
exports.PhoneNumberType = void 0;
const typeorm_1 = require("typeorm");
const UsersPhones_1 = require("./UsersPhones");
let PhoneNumberType = exports.PhoneNumberType = class PhoneNumberType {
};
__decorate([
    (0, typeorm_1.Column)("character varying", {
        primary: true,
        name: "ponty_code",
        length: 15,
    }),
    __metadata("design:type", String)
], PhoneNumberType.prototype, "pontyCode", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "ponty_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], PhoneNumberType.prototype, "pontyModifiedDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersPhones_1.UsersPhones, (usersPhones) => usersPhones.uspoPontyCode),
    __metadata("design:type", Array)
], PhoneNumberType.prototype, "usersPhones", void 0);
exports.PhoneNumberType = PhoneNumberType = __decorate([
    (0, typeorm_1.Index)("phone_number_type_pkey", ["pontyCode"], { unique: true }),
    (0, typeorm_1.Entity)("phone_number_type", { schema: "users" })
], PhoneNumberType);
//# sourceMappingURL=PhoneNumberType.js.map