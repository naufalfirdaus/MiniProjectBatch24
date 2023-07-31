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
exports.Fintech = void 0;
const typeorm_1 = require("typeorm");
const BusinessEntity_1 = require("./BusinessEntity");
let Fintech = exports.Fintech = class Fintech {
};
__decorate([
    (0, typeorm_1.Column)("integer", { primary: true, name: "fint_entity_id" }),
    __metadata("design:type", Number)
], Fintech.prototype, "fintEntityId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "fint_code",
        nullable: true,
        unique: true,
        length: 10,
    }),
    __metadata("design:type", String)
], Fintech.prototype, "fintCode", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", {
        name: "fint_name",
        nullable: true,
        unique: true,
        length: 55,
    }),
    __metadata("design:type", String)
], Fintech.prototype, "fintName", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp without time zone", {
        name: "fint_modified_date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], Fintech.prototype, "fintModifiedDate", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => BusinessEntity_1.BusinessEntity, (businessEntity) => businessEntity.fintech),
    (0, typeorm_1.JoinColumn)([{ name: "fint_entity_id", referencedColumnName: "entityId" }]),
    __metadata("design:type", BusinessEntity_1.BusinessEntity)
], Fintech.prototype, "fintEntity", void 0);
exports.Fintech = Fintech = __decorate([
    (0, typeorm_1.Index)("fintech_fint_code_key", ["fintCode"], { unique: true }),
    (0, typeorm_1.Index)("fintech_pkey", ["fintEntityId"], { unique: true }),
    (0, typeorm_1.Index)("fintech_fint_name_key", ["fintName"], { unique: true }),
    (0, typeorm_1.Entity)("fintech", { schema: "payment" })
], Fintech);
//# sourceMappingURL=Fintech.js.map