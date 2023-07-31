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
exports.Roles = void 0;
const typeorm_1 = require("typeorm");
const UsersRoles_1 = require("./UsersRoles");
let Roles = exports.Roles = class Roles {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "role_id" }),
    __metadata("design:type", Number)
], Roles.prototype, "roleId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "role_name",
        nullable: true,
        length: 35,
    }),
    __metadata("design:type", String)
], Roles.prototype, "roleName", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "role_type",
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], Roles.prototype, "roleType", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "role_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Roles.prototype, "roleModifiedDate", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersRoles_1.UsersRoles, (usersRoles) => usersRoles.usroRole),
    __metadata("design:type", Array)
], Roles.prototype, "usersRoles", void 0);
exports.Roles = Roles = __decorate([
    (0, typeorm_1.Index)("roles_pkey", ["roleId"], { unique: true }),
    (0, typeorm_1.Entity)("roles", { schema: "users" })
], Roles);
//# sourceMappingURL=Roles.js.map