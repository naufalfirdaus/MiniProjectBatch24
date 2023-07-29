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
exports.UsersRoles = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const Roles_1 = require("./Roles");
let UsersRoles = exports.UsersRoles = class UsersRoles {
};
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "usro_entity_id" }),
    __metadata("design:type", Number)
], UsersRoles.prototype, "usroEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "usro_role_id" }),
    __metadata("design:type", Number)
], UsersRoles.prototype, "usroRoleId", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usro_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersRoles.prototype, "usroModifiedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.usersRoles),
    (0, typeorm_1.JoinColumn)([
        { name: "usro_entity_id", referencedColumnName: "userEntityId" },
    ]),
    __metadata("design:type", Users_1.Users)
], UsersRoles.prototype, "usroEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roles_1.Roles, (roles) => roles.usersRoles),
    (0, typeorm_1.JoinColumn)([{ name: "usro_role_id", referencedColumnName: "roleId" }]),
    __metadata("design:type", Roles_1.Roles)
], UsersRoles.prototype, "usroRole", void 0);
exports.UsersRoles = UsersRoles = __decorate([
    (0, typeorm_1.Index)("usro_role_id", ["usroEntityId", "usroRoleId"], { unique: true }),
    (0, typeorm_1.Entity)("users_roles", { schema: "users" })
], UsersRoles);
//# sourceMappingURL=UsersRoles.js.map