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
exports.FintechController = void 0;
const common_1 = require("@nestjs/common");
const fintech_service_1 = require("./fintech.service");
const fintech_dto_1 = require("./dto/fintech.dto");
fintech_dto_1.FintechDto;
let FintechController = exports.FintechController = class FintechController {
    constructor(Services) {
        this.Services = Services;
    }
    async getAll(page, limit, search) {
        return this.Services.findAll(search, {
            page: page,
            limit: limit,
        });
    }
    async findOne(id) {
        return this.Services.findOne(id);
    }
    async create(body) {
        return this.Services.Insert(body);
    }
    async update(id, fint_code, fint_name) {
        return this.Services.Update(id, fint_code, fint_name);
    }
    async delete(id) {
        return this.Services.Delete(id);
    }
};
__decorate([
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('page', new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', new common_1.DefaultValuePipe(5), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('name', new common_1.DefaultValuePipe(null))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], FintechController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FintechController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fintech_dto_1.FintechDto]),
    __metadata("design:returntype", Promise)
], FintechController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('update/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('fint_code')),
    __param(2, (0, common_1.Body)('fint_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], FintechController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FintechController.prototype, "delete", null);
exports.FintechController = FintechController = __decorate([
    (0, common_1.Controller)('api/fintech/fintech'),
    __metadata("design:paramtypes", [fintech_service_1.FintechService])
], FintechController);
//# sourceMappingURL=fintech.controller.js.map