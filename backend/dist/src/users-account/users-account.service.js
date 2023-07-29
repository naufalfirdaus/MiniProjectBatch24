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
exports.UsersAccountService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const UsersAccount_1 = require("../../output/entities/UsersAccount");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
let UsersAccountService = exports.UsersAccountService = class UsersAccountService {
    constructor(serviceUsersAccount) {
        this.serviceUsersAccount = serviceUsersAccount;
    }
    async findAll(options) {
        const users_account = await this.serviceUsersAccount.createQueryBuilder('users_account');
        return (0, nestjs_typeorm_paginate_1.paginate)(users_account, options);
    }
    async findOne(id) {
        try {
            return await this.serviceUsersAccount.findOne({
                where: { usacUserEntityId: id },
            });
        }
        catch (error) {
            return error.message;
        }
    }
    async Create(body) {
        try {
            const time = new Date().toISOString();
            const users = await this.serviceUsersAccount.save({
                usacBankEntityId: body.bank_id,
                usacUserEntityId: body.user_id,
                usacAccountNumber: body.usac_account_number,
                usacSaldo: body.usac_saldo,
                usacType: body.usac_type,
                usacStartDate: time,
                usacEndDate: time,
                usacModifiedDate: time,
                usacStatus: body.usac_status,
            });
            return users;
        }
        catch (error) {
            return error.message;
        }
    }
    async Edit(accNumber, body) {
        try {
            const time = new Date().toISOString();
            const findUser = await this.serviceUsersAccount.findOne({
                where: { usacAccountNumber: accNumber },
            });
            if (findUser) {
                const users = await this.serviceUsersAccount.update({ usacAccountNumber: accNumber }, {
                    usacSaldo: body.usac_saldo,
                    usacType: body.usac_type,
                    usacEndDate: time,
                    usacModifiedDate: time,
                    usacStatus: body.usac_status,
                });
                return users;
            }
            else {
                const msg = 'User not found';
                return msg;
            }
        }
        catch (error) {
            return error.message;
        }
    }
    async Delete(accNumber) {
        try {
            const findUser = await this.serviceUsersAccount.findOne({
                where: { usacAccountNumber: accNumber },
            });
            if (findUser) {
                return await this.serviceUsersAccount.delete({
                    usacAccountNumber: accNumber,
                });
            }
            else {
                const msg = 'User not found';
                return msg;
            }
        }
        catch (error) {
            return error.message;
        }
    }
};
exports.UsersAccountService = UsersAccountService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(UsersAccount_1.UsersAccount)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersAccountService);
//# sourceMappingURL=users-account.service.js.map