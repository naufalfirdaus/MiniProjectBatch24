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
const bank_service_1 = require("../payment/bank/bank.service");
const bank_controller_1 = require("../payment/bank/bank.controller");
const UsersAccount_1 = require("../../output/entities/UsersAccount");
const users_account_service_1 = require("../users-account/users-account.service");
const users_account_controller_1 = require("../users-account/users-account.controller");
const Fintech_1 = require("../../output/entities/Fintech");
const fintech_service_1 = require("../payment/fintech/fintech.service");
const fintech_controller_1 = require("../payment/fintech/fintech.controller");
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
const transactions_controller_1 = require("../payment/transactions/transactions.controller");
const transactions_service_1 = require("../payment/transactions/transactions.service");
const TransactionPayment_1 = require("../../output/entities/TransactionPayment");
const Address_1 = require("../../output/entities/Address");
const AddressType_1 = require("../../output/entities/AddressType");
const Batch_1 = require("../../output/entities/Batch");
const BatchTrainee_1 = require("../../output/entities/BatchTrainee");
const BatchTraineeEvaluation_1 = require("../../output/entities/BatchTraineeEvaluation");
const CartItems_1 = require("../../output/entities/CartItems");
const Category_1 = require("../../output/entities/Category");
const City_1 = require("../../output/entities/City");
const Country_1 = require("../../output/entities/Country");
const Department_1 = require("../../output/entities/Department");
const Education_1 = require("../../output/entities/Education");
const Employee_1 = require("../../output/entities/Employee");
const EmployeeClientContract_1 = require("../../output/entities/EmployeeClientContract");
const EmployeeDepartmentHistory_1 = require("../../output/entities/EmployeeDepartmentHistory");
const EmployeePayHistory_1 = require("../../output/entities/EmployeePayHistory");
const Industry_1 = require("../../output/entities/Industry");
const InstructorPrograms_1 = require("../../output/entities/InstructorPrograms");
const JobRole_1 = require("../../output/entities/JobRole");
const JobType_1 = require("../../output/entities/JobType");
const Modules_1 = require("../../output/entities/Modules");
const ProgramApply_1 = require("../../output/entities/ProgramApply");
const ProgramApplyProgress_1 = require("../../output/entities/ProgramApplyProgress");
const ProgramEntity_1 = require("../../output/entities/ProgramEntity");
const ProgramEntityDescription_1 = require("../../output/entities/ProgramEntityDescription");
const ProgramReviews_1 = require("../../output/entities/ProgramReviews");
const Province_1 = require("../../output/entities/Province");
const RouteActions_1 = require("../../output/entities/RouteActions");
const SalesOrderDetail_1 = require("../../output/entities/SalesOrderDetail");
const SalesOrderHeader_1 = require("../../output/entities/SalesOrderHeader");
const SectionDetail_1 = require("../../output/entities/SectionDetail");
const SectionDetailMaterial_1 = require("../../output/entities/SectionDetailMaterial");
const Sections_1 = require("../../output/entities/Sections");
const SkillTemplate_1 = require("../../output/entities/SkillTemplate");
const SkillType_1 = require("../../output/entities/SkillType");
const SpecialOffer_1 = require("../../output/entities/SpecialOffer");
const SpecialOfferPrograms_1 = require("../../output/entities/SpecialOfferPrograms");
const Status_1 = require("../../output/entities/Status");
let GlobalModule = exports.GlobalModule = class GlobalModule {
};
exports.GlobalModule = GlobalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                Address_1.Address,
                AddressType_1.AddressType,
                Bank_1.Bank,
                Batch_1.Batch,
                BatchTrainee_1.BatchTrainee,
                BatchTraineeEvaluation_1.BatchTraineeEvaluation,
                BusinessEntity_1.BusinessEntity,
                CartItems_1.CartItems,
                Category_1.Category,
                City_1.City,
                Country_1.Country,
                Department_1.Department,
                Education_1.Education,
                Employee_1.Employee,
                EmployeeClientContract_1.EmployeeClientContract,
                EmployeeDepartmentHistory_1.EmployeeDepartmentHistory,
                EmployeePayHistory_1.EmployeePayHistory,
                Fintech_1.Fintech,
                Industry_1.Industry,
                InstructorPrograms_1.InstructorPrograms,
                JobRole_1.JobRole,
                JobType_1.JobType,
                Modules_1.Modules,
                PhoneNumberType_1.PhoneNumberType,
                ProgramApply_1.ProgramApply,
                ProgramApplyProgress_1.ProgramApplyProgress,
                ProgramEntity_1.ProgramEntity,
                ProgramEntityDescription_1.ProgramEntityDescription,
                ProgramReviews_1.ProgramReviews,
                Province_1.Province,
                Roles_1.Roles,
                RouteActions_1.RouteActions,
                SalesOrderDetail_1.SalesOrderDetail,
                SalesOrderHeader_1.SalesOrderHeader,
                SectionDetail_1.SectionDetail,
                SectionDetailMaterial_1.SectionDetailMaterial,
                Sections_1.Sections,
                SkillTemplate_1.SkillTemplate,
                SkillType_1.SkillType,
                SpecialOffer_1.SpecialOffer,
                SpecialOfferPrograms_1.SpecialOfferPrograms,
                Status_1.Status,
                TransactionPayment_1.TransactionPayment,
                UsersAccount_1.UsersAccount,
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
            ]),
        ],
        providers: [bank_service_1.BankService, users_account_service_1.UsersAccountService, fintech_service_1.FintechService, transactions_service_1.TransactionsService],
        controllers: [bank_controller_1.BankController, users_account_controller_1.UsersAccountController, fintech_controller_1.FintechController, transactions_controller_1.TransactionsController],
    })
], GlobalModule);
//# sourceMappingURL=global.module.js.map