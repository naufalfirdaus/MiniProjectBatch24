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
exports.UsersPhones = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const PhoneNumberType_1 = require("./PhoneNumberType");
let UsersPhones = exports.UsersPhones = class UsersPhones {
};
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "uspo_entity_id" }),
    __metadata("design:type", Number)
], UsersPhones.prototype, "uspoEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        primary: true,
        name: "uspo_number",
        length: 15,
    }),
    __metadata("design:type", String)
], UsersPhones.prototype, "uspoNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "uspo_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersPhones.prototype, "uspoModifiedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.usersPhones),
    (0, typeorm_1.JoinColumn)([
        { name: "uspo_entity_id", referencedColumnName: "userEntityId" },
    ]),
    __metadata("design:type", Users_1.Users)
], UsersPhones.prototype, "uspoEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PhoneNumberType_1.PhoneNumberType, (phoneNumberType) => phoneNumberType.usersPhones),
    (0, typeorm_1.JoinColumn)([{ name: "uspo_ponty_code", referencedColumnName: "pontyCode" }]),
    __metadata("design:type", PhoneNumberType_1.PhoneNumberType)
], UsersPhones.prototype, "uspoPontyCode", void 0);
exports.UsersPhones = UsersPhones = __decorate([
    (0, typeorm_1.Index)("phones", ["uspoEntityId", "uspoNumber"], { unique: true }),
    (0, typeorm_1.Entity)("users_phones", { schema: "users" })
], UsersPhones);
//# sourceMappingURL=UsersPhones.js.map