import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchTrainee } from 'output/entities/BatchTrainee';
import { ProgramApply } from 'output/entities/ProgramApply';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
    constructor(
        @InjectRepository(ProgramApply)
        private serProgram: Repository<ProgramApply>,
        @InjectRepository(BatchTrainee)
        private batchProg: Repository<BatchTrainee>
    ){}

    public async getCount(){
        const allCandidate = await this.serProgram.count();
        const allBatchTrainee = await this.batchProg.count();
        const all = allCandidate + allBatchTrainee;

        return { all, allBatchTrainee};
    }

}
