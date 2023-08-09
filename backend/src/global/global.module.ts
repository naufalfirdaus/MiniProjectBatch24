import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { JobhireController } from '../jobhire/jobhire.controller';
import { JobhireService } from '../jobhire/jobhire.service';
import { Address } from 'output/entities/Address';
import { Client } from 'output/entities/Client';
import { EmployeeRange } from 'output/entities/EmployeeRange';
import { JobPost } from 'output/entities/JobPost';
import { JobPhoto } from 'output/entities/JobPhoto';
import { JobPostDesc } from 'output/entities/JobPostDesc';
import { JobCategory } from 'output/entities/JobCategory';
import { Status } from 'output/entities/Status';
import { TalentApply } from 'output/entities/TalentApply';
import { TalentApplyProgress } from 'output/entities/TalentApplyProgress';
import { JobPhotoMulter } from 'src/multer/jobphoto-multer';
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
    ]),
    MulterModule.register(JobPhotoMulter.MulterOption()),
  ],
  controllers: [
    JobhireController,
    ClientController,
    JobCategoryController,
    EmployeeRangeController,
    MasterController, // this will change after integrated with master module
  ],
  providers: [
    JobhireService,
    ClientService,
    JobCategoryService,
    EmployeeRangeService,
    MasterService, // this will change after integrated with master module
  ],
})
export class GlobalModule {}
