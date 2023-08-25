import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batch } from 'output/entities/Batch';
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
import { BatchController } from 'src/batch/batch.controller';
import { BatchService } from 'src/batch/batch.service';
import { CandidatesController } from 'src/candidates/candidates.controller';
import { CandidatesService } from 'src/candidates/candidates.service';
import { DashboardController } from 'src/dashboard/dashboard.controller';
import { DashboardService } from 'src/dashboard/dashboard.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { LocalGuard } from 'src/auth/local/local.guard';
import { JwtGuard } from 'src/auth/jwt/jwt.guard';
import { Roles } from 'output/entities/Roles';

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
    ]),
    PassportModule,
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
