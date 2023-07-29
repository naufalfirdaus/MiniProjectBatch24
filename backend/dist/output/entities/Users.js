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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const BusinessEntity_1 = require("./BusinessEntity");
const UsersAddress_1 = require("./UsersAddress");
const UsersEducation_1 = require("./UsersEducation");
const UsersEmail_1 = require("./UsersEmail");
const UsersExperiences_1 = require("./UsersExperiences");
const UsersLicense_1 = require("./UsersLicense");
const UsersMedia_1 = require("./UsersMedia");
const UsersPhones_1 = require("./UsersPhones");
const UsersRoles_1 = require("./UsersRoles");
const UsersSkill_1 = require("./UsersSkill");
let Users = exports.Users = class Users {
};
__decorate([
    (0, typeorm_1.Column)('integer', { primary: true, name: 'user_entity_id' }),
    __metadata("design:type", Number)
], Users.prototype, "userEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'user_name',
        nullable: true,
        unique: true,
        length: 15,
    }),
    __metadata("design:type", String)
], Users.prototype, "userName", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'user_password',
        nullable: true,
        length: 256,
    }),
    __metadata("design:type", String)
], Users.prototype, "userPassword", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'user_first_name',
        nullable: true,
        length: 50,
    }),
    __metadata("design:type", String)
], Users.prototype, "userFirstName", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'user_last_name',
        nullable: true,
        length: 50,
    }),
    __metadata("design:type", String)
], Users.prototype, "userLastName", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'user_birth_date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Users.prototype, "userBirthDate", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'user_email_promotion', nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "userEmailPromotion", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'user_demographic', nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "userDemographic", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'user_modified_date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], Users.prototype, "userModifiedDate", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'user_photo',
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], Users.prototype, "userPhoto", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'user_current_role', nullable: true }),
    __metadata("design:type", Number)
], Users.prototype, "userCurrentRole", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => BusinessEntity_1.BusinessEntity, (businessEntity) => businessEntity.users),
    (0, typeorm_1.JoinColumn)([{ name: 'user_entity_id', referencedColumnName: 'entityId' }]),
    __metadata("design:type", BusinessEntity_1.BusinessEntity)
], Users.prototype, "userEntity", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersAddress_1.UsersAddress, (usersAddress) => usersAddress.etadEntity),
    __metadata("design:type", Array)
], Users.prototype, "usersAddresses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersEducation_1.UsersEducation, (usersEducation) => usersEducation.usduEntity),
    __metadata("design:type", Array)
], Users.prototype, "usersEducations", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersEmail_1.UsersEmail, (usersEmail) => usersEmail.pmailEntity),
    __metadata("design:type", Array)
], Users.prototype, "usersEmails", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersExperiences_1.UsersExperiences, (usersExperiences) => usersExperiences.usexEntity),
    __metadata("design:type", Array)
], Users.prototype, "usersExperiences", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersLicense_1.UsersLicense, (usersLicense) => usersLicense.usliEntity),
    __metadata("design:type", Array)
], Users.prototype, "usersLicenses", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersMedia_1.UsersMedia, (usersMedia) => usersMedia.usmeEntity),
    __metadata("design:type", Array)
], Users.prototype, "usersMedias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersPhones_1.UsersPhones, (usersPhones) => usersPhones.uspoEntity),
    __metadata("design:type", Array)
], Users.prototype, "usersPhones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersRoles_1.UsersRoles, (usersRoles) => usersRoles.usroEntity),
    __metadata("design:type", Array)
], Users.prototype, "usersRoles", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersSkill_1.UsersSkill, (usersSkill) => usersSkill.uskiEntity),
    __metadata("design:type", Array)
], Users.prototype, "usersSkills", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Index)('users_pkey', ['userEntityId'], { unique: true }),
    (0, typeorm_1.Index)('users_user_name_key', ['userName'], { unique: true }),
    (0, typeorm_1.Entity)('users', { schema: 'users' })
], Users);
//# sourceMappingURL=Users.js.map