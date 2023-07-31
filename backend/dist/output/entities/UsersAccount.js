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
exports.UsersAccount = void 0;
const typeorm_1 = require("typeorm");
const BusinessEntity_1 = require("./BusinessEntity");
const Users_1 = require("./Users");
let UsersAccount = exports.UsersAccount = class UsersAccount {
};
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "usac_bank_entity_id" }),
    __metadata("design:type", Number)
], UsersAccount.prototype, "usacBankEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "usac_user_entity_id" }),
    __metadata("design:type", Number)
], UsersAccount.prototype, "usacUserEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usac_account_number",
        nullable: true,
        unique: true,
        length: 25,
    }),
    __metadata("design:type", String)
], UsersAccount.prototype, "usacAccountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("numeric", { name: "usac_saldo", nullable: true }),
    __metadata("design:type", String)
], UsersAccount.prototype, "usacSaldo", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usac_type",
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], UsersAccount.prototype, "usacType", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usac_start_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersAccount.prototype, "usacStartDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usac_end_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersAccount.prototype, "usacEndDate", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "usac_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], UsersAccount.prototype, "usacModifiedDate", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "usac_status",
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], UsersAccount.prototype, "usacStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => BusinessEntity_1.BusinessEntity, (businessEntity) => businessEntity.usersAccounts),
    (0, typeorm_1.JoinColumn)([
        { name: "usac_bank_entity_id", referencedColumnName: "entityId" },
    ]),
    __metadata("design:type", BusinessEntity_1.BusinessEntity)
], UsersAccount.prototype, "usacBankEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.usersAccounts),
    (0, typeorm_1.JoinColumn)([
        { name: "usac_user_entity_id", referencedColumnName: "userEntityId" },
    ]),
    __metadata("design:type", Users_1.Users)
], UsersAccount.prototype, "usacUserEntity", void 0);
exports.UsersAccount = UsersAccount = __decorate([
    (0, typeorm_1.Index)("users_account_usac_account_number_key", ["usacAccountNumber"], {
        unique: true,
    }),
    (0, typeorm_1.Index)("users_account_pkey", ["usacBankEntityId", "usacUserEntityId"], {
        unique: true,
    }),
    (0, typeorm_1.Entity)("users_account", { schema: "payment" })
], UsersAccount);
//# sourceMappingURL=UsersAccount.js.map