import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobhireController } from '../jobhire/jobhire.controller';
import { JobhireService } from '../jobhire/jobhire.service';
import { Client } from 'output/entities/Client';
import { EmployeeRange } from 'output/entities/EmployeeRange';
import { JobPost } from 'output/entities/JobPost';
import { JobPhoto } from 'output/entities/JobPhoto';
import { JobPostDesc } from 'output/entities/JobPostDesc';
import { JobCategory } from 'output/entities/JobCategory';
import { Status } from 'output/entities/Status';
import { TalentApply } from 'output/entities/TalentApply';
import { TalentApplyProgress } from 'output/entities/TalentApplyProgress';
import { ClientController } from 'src/jobhire/client/client.controller';
import { ClientService } from 'src/jobhire/client/client.service';
import { JobCategoryController } from 'src/jobhire/job-category/job-category.controller';
import { JobCategoryService } from 'src/jobhire/job-category/job-category.service';
import { EmployeeRangeController } from 'src/jobhire/employee-range/employee-range.controller';
import { EmployeeRangeService } from 'src/jobhire/employee-range/employee-range.service';
import { JobRole } from 'output/entities/JobRole';
import { JobType } from 'output/entities/JobType';
import { MasterController } from 'src/master/master.controller';
import { MasterService } from 'src/master/master.service';
import { Industry } from 'output/entities/Industry';
import { Education } from 'output/entities/Education';
import { TalentApplyService } from 'src/jobhire/talent-apply/talent-apply.service';
import { UsersMedia } from 'output/entities/UsersMedia';
import { TalentApplyController } from 'src/jobhire/talent-apply/talent-apply.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { Users } from 'output/entities/Users';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UsersEmail } from 'output/entities/UsersEmail';
import { UsersPhones } from 'output/entities/UsersPhones';
import { PhoneNumberType } from 'output/entities/PhoneNumberType';
import { UsersRoles } from 'output/entities/UsersRoles';
import { Roles } from 'output/entities/Roles';
import { UsersAddress } from 'output/entities/UsersAddress';
import { Address } from 'output/entities/Address';
import { AddressType } from 'output/entities/AddressType';
import { City } from 'output/entities/City';
import { UsersSkill } from 'output/entities/UsersSkill';
import { SkillType } from 'output/entities/SkillType';
import { LocalGuard } from 'src/auth/local/local.guard';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { UploadMulter } from 'src/multer/multer';
import { UsersExperiences } from 'output/entities/UsersExperiences';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      JobPost,
      JobPhoto,
      JobPostDesc,
      Client,
      JobCategory,
      EmployeeRange,
      Address,
      TalentApply,
      TalentApplyProgress,
      Status,
      JobRole,
      JobType,
      Industry,
      Education,
      Users,
      BusinessEntity,
      UsersEducation,
      UsersEmail,
      UsersPhones,
      UsersMedia,
      PhoneNumberType,
      UsersRoles,
      UsersAddress,
      Roles,
      Address,
      AddressType,
      City,
      UsersEducation,
      UsersExperiences,
      UsersSkill,
      SkillType,
    ]),
    MulterModule.register(UploadMulter.MulterOption()),
    PassportModule,
    JwtModule.register({ secret: 'miniproject' }),
  ],
  controllers: [
    JobhireController,
    ClientController,
    JobCategoryController,
    EmployeeRangeController,
    TalentApplyController,
    MasterController, // this will change after integrated with master module
    UsersController,
  ],
  providers: [
    JobhireService,
    ClientService,
    JobCategoryService,
    EmployeeRangeService,
    TalentApplyService,
    MasterService, // this will change after integrated with master module
    UsersService,
    LocalGuard,
    JwtGuard,
  ],
  exports: [UsersService],
})
export class GlobalModule {}
