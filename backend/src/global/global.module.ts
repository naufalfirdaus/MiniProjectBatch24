import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from 'output/entities/Bank';
import { BankService } from 'src/payment/bank/bank.service';
import { BankController } from 'src/payment/bank/bank.controller';
import { UsersAccount } from 'output/entities/UsersAccount';
import { UsersAccountService } from 'src/payment/users-account/users-account.service';
import { UsersAccountController } from 'src/payment/users-account/users-account.controller';
import { Fintech } from 'output/entities/Fintech';
import { FintechService } from 'src/payment/fintech/fintech.service';
import { FintechController } from 'src/payment/fintech/fintech.controller';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { Users } from 'output/entities/Users';
import { UsersAddress } from 'output/entities/UsersAddress';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UsersEmail } from 'output/entities/UsersEmail';
import { UsersExperiences } from 'output/entities/UsersExperiences';
import { UsersSkill } from 'output/entities/UsersSkill';
import { UsersLicense } from 'output/entities/UsersLicense';
import { UsersMedia } from 'output/entities/UsersMedia';
import { UsersPhones } from 'output/entities/UsersPhones';
import { PhoneNumberType } from 'output/entities/PhoneNumberType';
import { UsersRoles } from 'output/entities/UsersRoles';
import { Roles } from 'output/entities/Roles';
import { TransactionsController } from 'src/payment/transactions/transactions.controller';
import { TransactionsService } from 'src/payment/transactions/transactions.service';
import { TransactionPayment } from 'output/entities/TransactionPayment';
import { Address } from 'output/entities/Address';
import { AddressType } from 'output/entities/AddressType';
import { Batch } from 'output/entities/Batch';
import { BatchTrainee } from 'output/entities/BatchTrainee';
import { BatchTraineeEvaluation } from 'output/entities/BatchTraineeEvaluation';
import { CartItems } from 'output/entities/CartItems';
import { Category } from 'output/entities/Category';
import { City } from 'output/entities/City';
import { Country } from 'output/entities/Country';
import { Department } from 'output/entities/Department';
import { Education } from 'output/entities/Education';
import { Employee } from 'output/entities/Employee';
import { EmployeeClientContract } from 'output/entities/EmployeeClientContract';
import { EmployeeDepartmentHistory } from 'output/entities/EmployeeDepartmentHistory';
import { EmployeePayHistory } from 'output/entities/EmployeePayHistory';
import { Industry } from 'output/entities/Industry';
import { InstructorPrograms } from 'output/entities/InstructorPrograms';
import { JobRole } from 'output/entities/JobRole';
import { JobType } from 'output/entities/JobType';
import { Modules } from 'output/entities/Modules';
import { ProgramApply } from 'output/entities/ProgramApply';
import { ProgramApplyProgress } from 'output/entities/ProgramApplyProgress';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { ProgramEntityDescription } from 'output/entities/ProgramEntityDescription';
import { ProgramReviews } from 'output/entities/ProgramReviews';
import { Province } from 'output/entities/Province';
import { RouteActions } from 'output/entities/RouteActions';
import { SalesOrderDetail } from 'output/entities/SalesOrderDetail';
import { SalesOrderHeader } from 'output/entities/SalesOrderHeader';
import { SectionDetail } from 'output/entities/SectionDetail';
import { SectionDetailMaterial } from 'output/entities/SectionDetailMaterial';
import { Sections } from 'output/entities/Sections';
import { SkillTemplate } from 'output/entities/SkillTemplate';
import { SkillType } from 'output/entities/SkillType';
import { SpecialOffer } from 'output/entities/SpecialOffer';
import { SpecialOfferPrograms } from 'output/entities/SpecialOfferPrograms';
import { Status } from 'output/entities/Status';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Address,
      AddressType,
      Bank,
      Batch,
      BatchTrainee,
      BatchTraineeEvaluation,
      BusinessEntity,
      CartItems,
      Category,
      City,
      Country,
      Department,
      Education,
      Employee,
      EmployeeClientContract,
      EmployeeDepartmentHistory,
      EmployeePayHistory,
      Fintech,
      Industry,
      InstructorPrograms,
      JobRole,
      JobType,
      Modules,
      PhoneNumberType,
      ProgramApply,
      ProgramApplyProgress,
      ProgramEntity,
      ProgramEntityDescription,
      ProgramReviews,
      Province,
      Roles,
      RouteActions,
      SalesOrderDetail,
      SalesOrderHeader,
      SectionDetail,
      SectionDetailMaterial,
      Sections,
      SkillTemplate,
      SkillType,
      SpecialOffer,
      SpecialOfferPrograms,
      Status,
      TransactionPayment,
      UsersAccount,
      Users,
      UsersAddress,
      UsersEducation,
      UsersEmail,
      UsersExperiences,
      UsersSkill,
      UsersLicense,
      UsersMedia,
      UsersPhones,
      UsersPhones,
      PhoneNumberType,
      UsersRoles,
    ]),
  ],
  providers: [BankService, UsersAccountService, FintechService, TransactionsService],
  controllers: [BankController, UsersAccountController, FintechController, TransactionsController],
})
export class GlobalModule { }
