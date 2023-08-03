import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batch } from 'output/entities/Batch';
import { ProgramApply } from 'output/entities/ProgramApply';
import { RouteActions } from 'output/entities/RouteActions';
import { Status } from 'output/entities/Status';
import { BatchController } from 'src/batch/batch.controller';
import { BatchService } from 'src/batch/batch.service';
import { CandidatesController } from 'src/candidates/candidates.controller';
import { CandidatesService } from 'src/candidates/candidates.service';

@Module({
    imports : [TypeOrmModule.forFeature([ProgramApply, Batch, Status, RouteActions])],
    providers : [CandidatesService, BatchService],
    controllers : [CandidatesController, BatchController]
})
export class GlobalModule {}
