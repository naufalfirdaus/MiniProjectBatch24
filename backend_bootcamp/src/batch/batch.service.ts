import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from 'output/entities/Batch';
import { Repository } from 'typeorm'

@Injectable()
export class BatchService {
    constructor(
        @InjectRepository(Batch) private batchProgram: Repository<Batch>
    ) {}

    public async findAll(batch : string, status : string){
        const queryBatch = await this.batchProgram.createQueryBuilder('batch')
        .leftJoinAndSelect("batch.batchTrainees", 'batch_trainee')
        .leftJoinAndSelect("batch.instructorPrograms", 'instructor_program')
        .leftJoinAndSelect("batch.batchEntity", 'program_entity')
        .leftJoinAndSelect("batch.batchStatus", 'status')
        .leftJoinAndSelect("batch_trainee.batrTraineeEntity", 'user')
        .where('batch.batchName Like :batch', {batch : `%${batch}%`})
        .orWhere('status.status Like :status', {status : `%${status}%`})
        .getMany()

        // const queryBatch = await this.batchProgram.find({
        //     relations : {batchTrainees : {batrTraineeEntity : true}, batchPic : true, batchEntity : true, instructorPrograms : { inproEmpEntity : {empEntity : true}}},
        //     where : { : `%${status}%` }
        // })

        return queryBatch;

    }
    
}
