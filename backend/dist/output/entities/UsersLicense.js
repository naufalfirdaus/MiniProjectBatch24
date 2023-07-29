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
exports.UsersLicense = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let UsersLicense = exports.UsersLicense = class UsersLicense {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "usli_id" }),
    __metadata("design:type", Number)
], UsersLicense.prototype, "usliId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usli_license_code",
        nullable: true,
        unique: true,
        length: 512,
    }),
    __metadata("design:type", String)
], UsersLicense.prototype, "usliLicenseCode", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usli_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersLicense.prototype, "usliModifiedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usli_status",
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], UsersLicense.prototype, "usliStatus", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "usli_entity_id" }),
    __metadata("design:type", Number)
], UsersLicense.prototype, "usliEntityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.usersLicenses),
    (0, typeorm_1.JoinColumn)([
        { name: "usli_entity_id", referencedColumnName: "userEntityId" },
    ]),
    __metadata("design:type", Users_1.Users)
], UsersLicense.prototype, "usliEntity", void 0);
exports.UsersLicense = UsersLicense = __decorate([
    (0, typeorm_1.Index)("usli_id", ["usliEntityId", "usliId"], { unique: true }),
    (0, typeorm_1.Index)("users_license_usli_license_code_key", ["usliLicenseCode"], {
        unique: true,
    }),
    (0, typeorm_1.Entity)("users_license", { schema: "users" })
], UsersLicense);
//# sourceMappingURL=UsersLicense.js.map