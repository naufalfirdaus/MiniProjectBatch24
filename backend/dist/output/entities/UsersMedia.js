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
exports.UsersMedia = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let UsersMedia = exports.UsersMedia = class UsersMedia {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "usme_id" }),
    __metadata("design:type", Number)
], UsersMedia.prototype, "usmeId", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "usme_entity_id" }),
    __metadata("design:type", Number)
], UsersMedia.prototype, "usmeEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usme_file_link",
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], UsersMedia.prototype, "usmeFileLink", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usme_filename",
        nullable: true,
        length: 55,
    }),
    __metadata("design:type", String)
], UsersMedia.prototype, "usmeFilename", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { name: "usme_filesize", nullable: true }),
    __metadata("design:type", Number)
], UsersMedia.prototype, "usmeFilesize", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usme_filetype",
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], UsersMedia.prototype, "usmeFiletype", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usme_note",
        nullable: true,
        length: 55,
    }),
    __metadata("design:type", String)
], UsersMedia.prototype, "usmeNote", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usme_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersMedia.prototype, "usmeModifiedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.usersMedias),
    (0, typeorm_1.JoinColumn)([
        { name: "usme_entity_id", referencedColumnName: "userEntityId" },
    ]),
    __metadata("design:type", Users_1.Users)
], UsersMedia.prototype, "usmeEntity", void 0);
exports.UsersMedia = UsersMedia = __decorate([
    (0, typeorm_1.Index)("media_id", ["usmeEntityId", "usmeId"], { unique: true }),
    (0, typeorm_1.Entity)("users_media", { schema: "users" })
], UsersMedia);
//# sourceMappingURL=UsersMedia.js.map