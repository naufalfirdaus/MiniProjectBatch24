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
exports.UsersEducation = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let UsersEducation = exports.UsersEducation = class UsersEducation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "usdu_id" }),
    __metadata("design:type", Number)
], UsersEducation.prototype, "usduId", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "usdu_entity_id" }),
    __metadata("design:type", Number)
], UsersEducation.prototype, "usduEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usdu_school",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], UsersEducation.prototype, "usduSchool", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usdu_degree",
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], UsersEducation.prototype, "usduDegree", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usdu_field_study",
        nullable: true,
        length: 125,
    }),
    __metadata("design:type", String)
], UsersEducation.prototype, "usduFieldStudy", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usdu_graduate_year",
        nullable: true,
        length: 4,
    }),
    __metadata("design:type", String)
], UsersEducation.prototype, "usduGraduateYear", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usdu_start_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersEducation.prototype, "usduStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usdu_end_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersEducation.prototype, "usduEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usdu_grade",
        nullable: true,
        length: 5,
    }),
    __metadata("design:type", String)
], UsersEducation.prototype, "usduGrade", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usdu_activities",
        nullable: true,
        length: 512,
    }),
    __metadata("design:type", String)
], UsersEducation.prototype, "usduActivities", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usdu_description",
        nullable: true,
        length: 512,
    }),
    __metadata("design:type", String)
], UsersEducation.prototype, "usduDescription", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usdu_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersEducation.prototype, "usduModifiedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.usersEducations),
    (0, typeorm_1.JoinColumn)([
        { name: "usdu_entity_id", referencedColumnName: "userEntityId" },
    ]),
    __metadata("design:type", Users_1.Users)
], UsersEducation.prototype, "usduEntity", void 0);
exports.UsersEducation = UsersEducation = __decorate([
    (0, typeorm_1.Index)("education", ["usduEntityId", "usduId"], { unique: true }),
    (0, typeorm_1.Entity)("users_education", { schema: "users" })
], UsersEducation);
//# sourceMappingURL=UsersEducation.js.map