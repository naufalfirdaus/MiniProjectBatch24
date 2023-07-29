"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Bank_1 = require("../../output/entities/Bank");
const bank_service_1 = require("../bank/bank.service");
const bank_controller_1 = require("../bank/bank.controller");
const UsersAccount_1 = require("../../output/entities/UsersAccount");
const users_account_service_1 = require("../users-account/users-account.service");
const users_account_controller_1 = require("../users-account/users-account.controller");
const Fintech_1 = require("../../output/entities/Fintech");
const fintech_service_1 = require("../fintech/fintech.service");
const fintech_controller_1 = require("../fintech/fintech.controller");
const BusinessEntity_1 = require("../../output/entities/BusinessEntity");
const Users_1 = require("../../output/entities/Users");
const UsersAddress_1 = require("../../output/entities/UsersAddress");
const UsersEducation_1 = require("../../output/entities/UsersEducation");
const UsersEmail_1 = require("../../output/entities/UsersEmail");
const UsersExperiences_1 = require("../../output/entities/UsersExperiences");
const UsersSkill_1 = require("../../output/entities/UsersSkill");
const UsersLicense_1 = require("../../output/entities/UsersLicense");
const UsersMedia_1 = require("../../output/entities/UsersMedia");
const UsersPhones_1 = require("../../output/entities/UsersPhones");
const PhoneNumberType_1 = require("../../output/entities/PhoneNumberType");
const UsersRoles_1 = require("../../output/entities/UsersRoles");
const Roles_1 = require("../../output/entities/Roles");
let GlobalModule = exports.GlobalModule = class GlobalModule {
};
exports.GlobalModule = GlobalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                Bank_1.Bank,
                UsersAccount_1.UsersAccount,
                Fintech_1.Fintech,
                BusinessEntity_1.BusinessEntity,
                Users_1.Users,
                UsersAddress_1.UsersAddress,
                UsersEducation_1.UsersEducation,
                UsersEmail_1.UsersEmail,
                UsersExperiences_1.UsersExperiences,
                UsersSkill_1.UsersSkill,
                UsersLicense_1.UsersLicense,
                UsersMedia_1.UsersMedia,
                UsersPhones_1.UsersPhones,
                UsersPhones_1.UsersPhones,
                PhoneNumberType_1.PhoneNumberType,
                UsersRoles_1.UsersRoles,
                Roles_1.Roles,
            ]),
        ],
        providers: [bank_service_1.BankService, users_account_service_1.UsersAccountService, fintech_service_1.FintechService],
        controllers: [bank_controller_1.BankController, users_account_controller_1.UsersAccountController, fintech_controller_1.FintechController],
    })
], GlobalModule);
//# sourceMappingURL=global.module.js.map