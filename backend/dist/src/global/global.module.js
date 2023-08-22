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
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const platform_express_1 = require("@nestjs/platform-express");
const users_service_1 = require("../users/users.service");
const users_controller_1 = require("../users/users.controller");
const Users_1 = require("../../output/entities/Users");
const BusinessEntity_1 = require("../../output/entities/BusinessEntity");
const UsersEducation_1 = require("../../output/entities/UsersEducation");
const UsersEmail_1 = require("../../output/entities/UsersEmail");
const UsersPhones_1 = require("../../output/entities/UsersPhones");
const PhoneNumberType_1 = require("../../output/entities/PhoneNumberType");
const UsersRoles_1 = require("../../output/entities/UsersRoles");
const Roles_1 = require("../../output/entities/Roles");
const UsersAddress_1 = require("../../output/entities/UsersAddress");
const Address_1 = require("../../output/entities/Address");
const AddressType_1 = require("../../output/entities/AddressType");
const City_1 = require("../../output/entities/City");
const local_guard_1 = require("../auth/local/local.guard");
const jwt_guard_1 = require("../auth/jwt/jwt.guard");
const multer_1 = require("../multer/multer");
const UsersExperiences_1 = require("../../output/entities/UsersExperiences");
const Bank_1 = require("../../output/entities/Bank");
const Fintech_1 = require("../../output/entities/Fintech");
const UsersAccount_1 = require("../../output/entities/UsersAccount");
const TransactionPayment_1 = require("../../output/entities/TransactionPayment");
const bank_controller_1 = require("../payment/bank/bank.controller");
const fintech_controller_1 = require("../payment/fintech/fintech.controller");
const bank_service_1 = require("../payment/bank/bank.service");
const fintech_service_1 = require("../payment/fintech/fintech.service");
const transactions_service_1 = require("../payment/transactions/transactions.service");
const users_account_service_1 = require("../payment/users-account/users-account.service");
const users_account_controller_1 = require("../payment/users-account/users-account.controller");
const transactions_controller_1 = require("../payment/transactions/transactions.controller");
let GlobalModule = exports.GlobalModule = class GlobalModule {
};
exports.GlobalModule = GlobalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                Users_1.Users,
                BusinessEntity_1.BusinessEntity,
                UsersEducation_1.UsersEducation,
                UsersEmail_1.UsersEmail,
                UsersPhones_1.UsersPhones,
                PhoneNumberType_1.PhoneNumberType,
                UsersRoles_1.UsersRoles,
                UsersAddress_1.UsersAddress,
                Roles_1.Roles,
                Address_1.Address,
                AddressType_1.AddressType,
                City_1.City,
                Bank_1.Bank,
                Fintech_1.Fintech,
                UsersAccount_1.UsersAccount,
                TransactionPayment_1.TransactionPayment,
                UsersEducation_1.UsersEducation,
                UsersExperiences_1.UsersExperiences,
            ]),
            platform_express_1.MulterModule.register(multer_1.UploadMulter.MulterOption()),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({ secret: 'miniproject' }),
        ],
        providers: [
            bank_service_1.BankService,
            users_account_service_1.UsersAccountService,
            fintech_service_1.FintechService,
            transactions_service_1.TransactionsService,
            users_service_1.UsersService,
            local_guard_1.LocalGuard,
            jwt_guard_1.JwtGuard,
        ],
        controllers: [
            bank_controller_1.BankController,
            users_account_controller_1.UsersAccountController,
            fintech_controller_1.FintechController,
            transactions_controller_1.TransactionsController,
            users_controller_1.UsersController,
        ],
        exports: [users_service_1.UsersService, users_account_service_1.UsersAccountService],
    })
], GlobalModule);
//# sourceMappingURL=global.module.js.map