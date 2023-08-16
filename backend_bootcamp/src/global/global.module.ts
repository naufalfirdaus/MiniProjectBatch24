import { Module } from '@nestjs/common';
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
      ProgramApplyProgress
    ]),
  ],
  providers: [CandidatesService, BatchService, DashboardService],
  controllers: [CandidatesController, BatchController, DashboardController],
})
export class GlobalModule {}
