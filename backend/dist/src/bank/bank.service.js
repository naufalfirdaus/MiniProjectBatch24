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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Bank_1 = require("../../output/entities/Bank");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const typeorm_2 = require("typeorm");
const BusinessEntity_1 = require("../../output/entities/BusinessEntity");
let BankService = exports.BankService = class BankService {
    constructor(serviceBank, serviceBusinessEntity) {
        this.serviceBank = serviceBank;
        this.serviceBusinessEntity = serviceBusinessEntity;
    }
    async findAll(search, options) {
        if (!search) {
            const bank = await this.serviceBank.createQueryBuilder('bank');
            return (0, nestjs_typeorm_paginate_1.paginate)(bank, options);
        }
        else {
            const bank = await this.serviceBank
                .createQueryBuilder('bank')
                .where(`bank.bank_name like :name`, {
                name: `%${search}%`,
            });
            return (0, nestjs_typeorm_paginate_1.paginate)(bank, options);
        }
    }
    async findOne(id) {
        try {
            return await this.serviceBank.findOne({
                where: {
                    bankEntityId: id,
                },
            });
        }
        catch (error) {
            return error.message;
        }
    }
    async Insert(body) {
        try {
            const businessEntity = new BusinessEntity_1.BusinessEntity();
            const savedBusinessEntity = await this.serviceBusinessEntity.save(businessEntity);
            const entity_id = savedBusinessEntity.entityId;
            const time = new Date().toISOString();
            const bank = await this.serviceBank.save({
                bankEntityId: entity_id,
                bankCode: body.bank_code,
                bankName: body.bank_name,
                bankModifiedDate: time,
            });
            return bank;
        }
        catch (error) {
            return error.message;
        }
    }
    async Update(id, bank_code, bank_name) {
        try {
            const time = new Date().toISOString();
            const bank = await this.serviceBank.update(id, {
                bankCode: bank_code,
                bankName: bank_name,
                bankModifiedDate: time,
            });
            return bank;
        }
        catch (error) {
            return error.message;
        }
    }
    async Delete(id) {
        try {
            return await this.serviceBank.delete(id);
        }
        catch (error) {
            return error.message;
        }
    }
};
exports.BankService = BankService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Bank_1.Bank)),
    __param(1, (0, typeorm_1.InjectRepository)(BusinessEntity_1.BusinessEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BankService);
//# sourceMappingURL=bank.service.js.map