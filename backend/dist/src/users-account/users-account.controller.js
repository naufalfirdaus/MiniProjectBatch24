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
exports.UsersAccountController = void 0;
const common_1 = require("@nestjs/common");
const users_account_service_1 = require("./users-account.service");
const users_dto_1 = require("./dto/users.dto");
let UsersAccountController = exports.UsersAccountController = class UsersAccountController {
    constructor(Services) {
        this.Services = Services;
    }
    async getAll(page, limit) {
        return this.Services.findAll({
            page: page,
            limit: limit,
        });
    }
    async getOne(id) {
        return this.Services.findOne(id);
    }
    async create(body) {
        return this.Services.Create(body);
    }
    async edit(accNumber, body) {
        return this.Services.Edit(accNumber, body);
    }
    async delete(accNumber) {
        return this.Services.Delete(accNumber);
    }
};
__decorate([
    (0, common_1.Get)('accounts'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(5), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], UsersAccountController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('account/debitSaldo'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersAccountController.prototype, "getOne", null);
__decorate([
    (0, common_1.Post)('account/debitSaldo'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.UsersDto]),
    __metadata("design:returntype", Promise)
], UsersAccountController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('account/debitSaldo/:accNumber'),
    __param(0, (0, common_1.Param)('accNumber')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersAccountController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)('account/debitSaldo/:accNumber'),
    __param(0, (0, common_1.Param)('accNumber')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersAccountController.prototype, "delete", null);
exports.UsersAccountController = UsersAccountController = __decorate([
    (0, common_1.Controller)('api/fintech'),
    __metadata("design:paramtypes", [users_account_service_1.UsersAccountService])
], UsersAccountController);
//# sourceMappingURL=users-account.controller.js.map