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
exports.TransactionPayment = void 0;
const typeorm_1 = require("typeorm");
let TransactionPayment = exports.TransactionPayment = class TransactionPayment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: 'integer', name: 'trpa_id' }),
    __metadata("design:type", Number)
], TransactionPayment.prototype, "trpaId", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'trpa_code_number',
        nullable: true,
        unique: true,
        length: 55,
    }),
    __metadata("design:type", String)
], TransactionPayment.prototype, "trpaCodeNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'trpa_order_number',
        nullable: true,
        length: 25,
    }),
    __metadata("design:type", String)
], TransactionPayment.prototype, "trpaOrderNumber", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { name: 'trpa_debit', nullable: true }),
    __metadata("design:type", String)
], TransactionPayment.prototype, "trpaDebit", void 0);
__decorate([
    (0, typeorm_1.Column)('numeric', { name: 'trpa_credit', nullable: true }),
    __metadata("design:type", String)
], TransactionPayment.prototype, "trpaCredit", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'trpa_type',
        nullable: true,
        length: 15,
    }),
    __metadata("design:type", String)
], TransactionPayment.prototype, "trpaType", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', {
        name: 'trpa_note',
        nullable: true,
        length: 255,
    }),
    __metadata("design:type", String)
], TransactionPayment.prototype, "trpaNote", void 0);
__decorate([
    (0, typeorm_1.Column)('timestamp without time zone', {
        name: 'trpa_modified_date',
        nullable: true,
    }),
    __metadata("design:type", Date)
], TransactionPayment.prototype, "trpaModifiedDate", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'trpa_source_id', length: 25 }),
    __metadata("design:type", String)
], TransactionPayment.prototype, "trpaSourceId", void 0);
__decorate([
    (0, typeorm_1.Column)('character varying', { name: 'trpa_target_id', length: 25 }),
    __metadata("design:type", String)
], TransactionPayment.prototype, "trpaTargetId", void 0);
__decorate([
    (0, typeorm_1.Column)('integer', { name: 'trpa_user_entity_id', nullable: true }),
    __metadata("design:type", Number)
], TransactionPayment.prototype, "trpaUserEntityId", void 0);
exports.TransactionPayment = TransactionPayment = __decorate([
    (0, typeorm_1.Index)('transaction_payment_trpa_code_number_key', ['trpaCodeNumber'], {
        unique: true,
    }),
    (0, typeorm_1.Index)('transaction_payment_pkey', ['trpaId'], { unique: true }),
    (0, typeorm_1.Entity)('transaction_payment', { schema: 'payment' })
], TransactionPayment);
//# sourceMappingURL=TransactionPayment.js.map