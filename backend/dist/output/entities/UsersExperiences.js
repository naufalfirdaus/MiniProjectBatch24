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
exports.UsersExperiences = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const UsersSkill_1 = require("./UsersSkill");
let UsersExperiences = exports.UsersExperiences = class UsersExperiences {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "usex_id" }),
    __metadata("design:type", Number)
], UsersExperiences.prototype, "usexId", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "usex_entity_id" }),
    __metadata("design:type", Number)
], UsersExperiences.prototype, "usexEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usex_title",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], UsersExperiences.prototype, "usexTitle", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usex_profile_headline",
        nullable: true,
        length: 512,
    }),
    __metadata("design:type", String)
], UsersExperiences.prototype, "usexProfileHeadline", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usex_employment_type",
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], UsersExperiences.prototype, "usexEmploymentType", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usex_company_name",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], UsersExperiences.prototype, "usexCompanyName", void 0);
__decorate([
    (0, typeorm_1.Column)("character", { name: "usex_is_current", nullable: true, length: 1 }),
    __metadata("design:type", String)
], UsersExperiences.prototype, "usexIsCurrent", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usex_start_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersExperiences.prototype, "usexStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usex_end_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersExperiences.prototype, "usexEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usex_industry",
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], UsersExperiences.prototype, "usexIndustry", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usex_description",
        nullable: true,
        length: 512,
    }),
    __metadata("design:type", String)
], UsersExperiences.prototype, "usexDescription", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usex_experience_type",
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], UsersExperiences.prototype, "usexExperienceType", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "usex_city_id", nullable: true }),
    __metadata("design:type", Number)
], UsersExperiences.prototype, "usexCityId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.usersExperiences),
    (0, typeorm_1.JoinColumn)([
        { name: "usex_entity_id", referencedColumnName: "userEntityId" },
    ]),
    __metadata("design:type", Users_1.Users)
], UsersExperiences.prototype, "usexEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => UsersSkill_1.UsersSkill, (usersSkill) => usersSkill.usersExperiences),
    (0, typeorm_1.JoinTable)({
        name: "users_experiences_skill",
        joinColumns: [{ name: "uesk_usex_id", referencedColumnName: "usexId" }],
        inverseJoinColumns: [
            { name: "uesk_uski_id", referencedColumnName: "uskiId" },
        ],
        schema: "users",
    }),
    __metadata("design:type", Array)
], UsersExperiences.prototype, "usersSkills", void 0);
exports.UsersExperiences = UsersExperiences = __decorate([
    (0, typeorm_1.Index)("usex_id", ["usexEntityId", "usexId"], { unique: true }),
    (0, typeorm_1.Index)("users_experiences_usex_id_key", ["usexId"], { unique: true }),
    (0, typeorm_1.Entity)("users_experiences", { schema: "users" })
], UsersExperiences);
//# sourceMappingURL=UsersExperiences.js.map