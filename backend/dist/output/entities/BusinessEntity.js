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
exports.BusinessEntity = void 0;
const typeorm_1 = require("typeorm");
const Bank_1 = require("./Bank");
const Fintech_1 = require("./Fintech");
const Users_1 = require("./Users");
const UsersAccount_1 = require("./UsersAccount");
let BusinessEntity = exports.BusinessEntity = class BusinessEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer", name: "entity_id" }),
    __metadata("design:type", Number)
], BusinessEntity.prototype, "entityId", void 0);
__decorate([
    (0, typeorm_1.Column)("date", {
        name: "entity_modified_date",
        nullable: true,
        default: () => "now()",
    }),
    __metadata("design:type", String)
], BusinessEntity.prototype, "entityModifiedDate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Bank_1.Bank, (bank) => bank.bankEntity),
    __metadata("design:type", Bank_1.Bank)
], BusinessEntity.prototype, "bank", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Fintech_1.Fintech, (fintech) => fintech.fintEntity),
    __metadata("design:type", Fintech_1.Fintech)
], BusinessEntity.prototype, "fintech", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Users_1.Users, (users) => users.userEntity),
    __metadata("design:type", Users_1.Users)
], BusinessEntity.prototype, "users", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UsersAccount_1.UsersAccount, (usersAccount) => usersAccount.usacBankEntity),
    __metadata("design:type", Array)
], BusinessEntity.prototype, "usersAccounts", void 0);
exports.BusinessEntity = BusinessEntity = __decorate([
    (0, typeorm_1.Index)("business_entity_pkey", ["entityId"], { unique: true }),
    (0, typeorm_1.Entity)("business_entity", { schema: "users" })
], BusinessEntity);
//# sourceMappingURL=BusinessEntity.js.map