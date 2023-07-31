import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramApply } from 'output/entities/ProgramApply';
import { CandidatesController } from 'src/candidates/candidates.controller';
import { CandidatesService } from 'src/candidates/candidates.service';

@Module({
    imports : [TypeOrmModule.forFeature([ProgramApply])],
    providers : [CandidatesService],
    controllers : [CandidatesController]
})
export class GlobalModule {}
