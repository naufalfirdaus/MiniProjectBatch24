import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { MulterModule } from '@nestjs/platform-express';
import { Batch } from 'output/entities/Batch';
import { UsersService } from 'src/users/users.service';
import { BatchTrainee } from 'output/entities/BatchTrainee';
import { BatchTraineeEvaluation } from 'output/entities/BatchTraineeEvaluation';
import { Category } from 'output/entities/Category';
import { Employee } from 'output/entities/Employee';
import { InstructorPrograms } from 'output/entities/InstructorPrograms';
import { ProgramApply } from 'output/entities/ProgramApply';
import { ProgramApplyProgress } from 'output/entities/ProgramApplyProgress';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { RouteActions } from 'output/entities/RouteActions';
import { Status } from 'output/entities/Status';
import { Users } from 'output/entities/Users';
import { UsersController } from 'src/users/users.controller';
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
import { CandidatesController } from 'src/candidates/candidates.controller';
import { CandidatesService } from 'src/candidates/candidates.service';
import { DashboardController } from 'src/dashboard/dashboard.controller';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { BatchService } from 'src/batch/batch.service';
import { BatchController } from 'src/batch/batch.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProgramApply,
      Batch,
      Status,
      RouteActions,
      ProgramEntity,
      Category,
      InstructorPrograms,
      Users,
      Employee,
      BatchTrainee,
      BatchTraineeEvaluation,
      ProgramApplyProgress,
      Roles,
      BusinessEntity,
      UsersEducation,
      UsersEmail,
      UsersPhones,
      PhoneNumberType,
      UsersRoles,
      UsersAddress,
      Address,
      AddressType,
      City,
      UsersExperiences,
      UsersSkill,
      SkillType,
    ]),
    PassportModule,
    MulterModule.register(UploadMulter.MulterOption()),
    JwtModule.register({
      secret: 'miniproject',
      signOptions: { expiresIn: '2d' },
    }),
  ],
  providers: [
    CandidatesService,
    BatchService,
    DashboardService,
    UsersService,
    LocalGuard,
    JwtGuard,
  ],
  controllers: [
    CandidatesController,
    BatchController,
    DashboardController,
    UsersController,
  ],
})
export class GlobalModule {}
