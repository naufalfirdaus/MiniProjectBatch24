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
exports.UsersSkill = void 0;
const typeorm_1 = require("typeorm");
const UsersExperiences_1 = require("./UsersExperiences");
const Users_1 = require("./Users");
let UsersSkill = exports.UsersSkill = class UsersSkill {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "uski_id" }),
    __metadata("design:type", Number)
], UsersSkill.prototype, "uskiId", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "uski_entity_id" }),
    __metadata("design:type", Number)
], UsersSkill.prototype, "uskiEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "uski_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersSkill.prototype, "uskiModifiedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "uski_skty_name",
        nullable: true,
        unique: true,
        length: 15,
    }),
    __metadata("design:type", String)
], UsersSkill.prototype, "uskiSktyName", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => UsersExperiences_1.UsersExperiences, (usersExperiences) => usersExperiences.usersSkills),
    __metadata("design:type", Array)
], UsersSkill.prototype, "usersExperiences", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.usersSkills),
    (0, typeorm_1.JoinColumn)([
        { name: "uski_entity_id", referencedColumnName: "userEntityId" },
    ]),
    __metadata("design:type", Users_1.Users)
], UsersSkill.prototype, "uskiEntity", void 0);
exports.UsersSkill = UsersSkill = __decorate([
    (0, typeorm_1.Index)("uski_id", ["uskiEntityId", "uskiId"], { unique: true }),
    (0, typeorm_1.Index)("users_skill_uski_id_key", ["uskiId"], { unique: true }),
    (0, typeorm_1.Index)("users_skill_uski_skty_name_key", ["uskiSktyName"], { unique: true }),
    (0, typeorm_1.Entity)("users_skill", { schema: "users" })
], UsersSkill);
//# sourceMappingURL=UsersSkill.js.map