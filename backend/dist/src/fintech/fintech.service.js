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
exports.FintechService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const BusinessEntity_1 = require("../../output/entities/BusinessEntity");
const Fintech_1 = require("../../output/entities/Fintech");
const typeorm_2 = require("typeorm");
let FintechService = exports.FintechService = class FintechService {
    constructor(serviceFintech, serviceBusinessEntity) {
        this.serviceFintech = serviceFintech;
        this.serviceBusinessEntity = serviceBusinessEntity;
    }
    async findAll(search, options) {
        if (!search) {
            const fintech = await this.serviceFintech.createQueryBuilder('fintech');
            return (0, nestjs_typeorm_paginate_1.paginate)(fintech, options);
        }
        else {
            const fintech = await this.serviceFintech
                .createQueryBuilder('fintech')
                .where(`fintech.fint_name like :name`, {
                name: `%${search}%`,
            });
            return (0, nestjs_typeorm_paginate_1.paginate)(fintech, options);
        }
    }
    async findOne(id) {
        try {
            return await this.serviceFintech.findOne({
                where: {
                    fintEntityId: id,
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
            const fint = await this.serviceFintech.save({
                fintEntityId: entity_id,
                fintCode: body.fint_code,
                fintName: body.fint_name,
                fintModifiedDate: time,
            });
            return fint;
        }
        catch (error) {
            return error.message;
        }
    }
    async Update(id, fint_code, fint_name) {
        try {
            const time = new Date().toISOString();
            const fintech = await this.serviceFintech.update(id, {
                fintCode: fint_code,
                fintName: fint_name,
                fintModifiedDate: time,
            });
            return fintech;
        }
        catch (error) {
            return error.message;
        }
    }
    async Delete(id) {
        try {
            return await this.serviceFintech.delete(id);
        }
        catch (error) {
            return error.message;
        }
    }
};
exports.FintechService = FintechService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Fintech_1.Fintech)),
    __param(1, (0, typeorm_1.InjectRepository)(BusinessEntity_1.BusinessEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FintechService);
//# sourceMappingURL=fintech.service.js.map