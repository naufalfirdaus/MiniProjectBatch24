import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batch } from 'output/entities/Batch';
import { Category } from 'output/entities/Category';
import { Employee } from 'output/entities/Employee';
import { InstructorPrograms } from 'output/entities/InstructorPrograms';
import { ProgramApply } from 'output/entities/ProgramApply';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { RouteActions } from 'output/entities/RouteActions';
import { Status } from 'output/entities/Status';
import { Users } from 'output/entities/Users';
import { BatchController } from 'src/batch/batch.controller';
import { BatchService } from 'src/batch/batch.service';
import { CandidatesController } from 'src/candidates/candidates.controller';
import { CandidatesService } from 'src/candidates/candidates.service';

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
    ]),
  ],
  providers: [CandidatesService, BatchService],
  controllers: [CandidatesController, BatchController],
})
export class GlobalModule {}
