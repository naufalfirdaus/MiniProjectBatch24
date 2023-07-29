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
exports.UsersEmail = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let UsersEmail = exports.UsersEmail = class UsersEmail {
};
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "pmail_entity_id" }),
    __metadata("design:type", Number)
], UsersEmail.prototype, "pmailEntityId", void 0);
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "pmail_id" }),
    __metadata("design:type", Number)
], UsersEmail.prototype, "pmailId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "pmail_address",
        nullable: true,
        length: 50,
    }),
    __metadata("design:type", String)
], UsersEmail.prototype, "pmailAddress", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "pmail_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersEmail.prototype, "pmailModifiedDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.usersEmails),
    (0, typeorm_1.JoinColumn)([
        { name: "pmail_entity_id", referencedColumnName: "userEntityId" },
    ]),
    __metadata("design:type", Users_1.Users)
], UsersEmail.prototype, "pmailEntity", void 0);
exports.UsersEmail = UsersEmail = __decorate([
    (0, typeorm_1.Index)("pmail_id", ["pmailEntityId", "pmailId"], { unique: true }),
    (0, typeorm_1.Entity)("users_email", { schema: "users" })
], UsersEmail);
//# sourceMappingURL=UsersEmail.js.map