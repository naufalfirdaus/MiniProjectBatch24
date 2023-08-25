import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from 'output/entities/Batch';
import { Repository } from 'typeorm';
import { PaginationDto } from './batc.dto';
import { RoomI } from './batc.interface';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { InstructorPrograms } from 'output/entities/InstructorPrograms';
import { Users } from 'output/entities/Users';
import { BatchTrainee } from 'output/entities/BatchTrainee';
import { ProgramApply } from 'output/entities/ProgramApply';
import { ProgramApplyProgress } from 'output/entities/ProgramApplyProgress';
import { BatchTraineeEvaluation } from 'output/entities/BatchTraineeEvaluation';

@Injectable()
export class BatchService {
  constructor(
    @InjectRepository(Batch) private batchProgram: Repository<Batch>,
    @InjectRepository(ProgramEntity)
    private progEntity: Repository<ProgramEntity>,
    @InjectRepository(InstructorPrograms)
    private instProg: Repository<InstructorPrograms>,
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(BatchTrainee)
    private batchTraineeService: Repository<BatchTrainee>,
    @InjectRepository(BatchTraineeEvaluation)
    private batchTraineeEvService: Repository<BatchTraineeEvaluation>,
    @InjectRepository(ProgramApply)
    private candidateApply: Repository<ProgramApply>,
    @InjectRepository(ProgramApplyProgress)
    private candidateApplyProgress: Repository<ProgramApplyProgress>,
  ) {}

  public async findAll(options: PaginationDto): Promise<RoomI> {
    const skippedItems = (options.page - 1) * options.limit;
    const totalCount = await this.batchProgram.count();
    const queryBatch = await this.batchProgram.find({
      relations: {
        batchTrainees: {
          batrTraineeEntity: true,
        },
        instructorPrograms: {
          inproEmpEntity: {
            empEntity: true,
          },
        },
        batchEntity: true,
        batchStatus: true,
      },
      skip: skippedItems,
      take: options.limit,
      order: { batchId: 'ASC' },
    });

    return {
      totalCount,
      page: options.page,
      limit: options.limit,
      data: queryBatch,
    };
  }

  public async findByBatchAndStatus(
    batch: string,
    status: string,
    options: PaginationDto,
  ): Promise<RoomI> {
    const skippedItems = (options.page - 1) * options.limit;
    const totalCount = await this.batchProgram.count();
    const queryBatch = await this.batchProgram
      .createQueryBuilder('batch')
      .leftJoinAndSelect('batch.batchTrainees', 'batch_trainee')
      .leftJoinAndSelect('batch.instructorPrograms', 'instructor_program')
      .leftJoinAndSelect('batch.batchEntity', 'program_entity')
      .leftJoinAndSelect('batch.batchStatus', 'status')
      .leftJoinAndSelect('batch_trainee.batrTraineeEntity', 'user')
      .leftJoinAndSelect('instructor_program.inproEmpEntity', 'employee')
      .leftJoinAndSelect('employee.empEntity', 'user_employee')
      .take(options.limit)
      .skip(skippedItems)
      .where('batch.batchName Like :batch', { batch: `%${batch}%` })
      .andWhere('status.status Like :status', { status: `%${status}%` })
      .getMany();

    return {
      totalCount,
      page: options.page,
      limit: options.limit,
      data: queryBatch,
    };
  }

  public async findOne(id: number) {
    const queryBatch = await this.batchProgram
      .createQueryBuilder('batch')
      .leftJoinAndSelect('batch.batchTrainees', 'batch_trainee')
      .leftJoinAndSelect('batch.instructorPrograms', 'instructor_program')
      .leftJoinAndSelect('batch.batchEntity', 'program_entity')
      .leftJoinAndSelect('batch.batchStatus', 'status')
      .leftJoinAndSelect('batch_trainee.batrTraineeEntity', 'users')
      .leftJoinAndSelect('users.usersEducations', 'users_education')
      .where('batch.batchId = :id', { id: id })
      .getOne();
    return queryBatch;
  }

  public async createBatch(fields: any) {
    const findProgEntity = await this.progEntity.findOne({
      where: {
        progEntityId: fields.batchEntityId,
      },
    });

    const batch = await this.batchProgram.save({
      batchStatus: {
        status: 'New',
      },
      batchName: fields.batchName,
      batchEntityId: fields.batchEntityId,
      batchType: findProgEntity.progLearningType,
      batchStartDate: fields.batchStartDate,
      batchEndDate: fields.batchEndDate,
      batchModifiedDate: new Date(),
    });

    for (let i = 0; i < fields.trainees.length; i++) {
      await this.addTrainee(batch.batchId, fields.trainees[i].prapUserEntityId);
      this.addBatchTraineeEvaliationSkillSet(
        batch.batchId,
        fields.trainees[i].prapUserEntityId,
      );
    }

    const trainer = [
      parseInt(fields.batchInstructorId),
      parseInt(fields.batchCoInstructorId),
    ];

    for (let i = 0; i < trainer.length; i++) {
      await this.instProg.save({
        batchId: batch.batchId,
        inproEntityId: fields.batchEntityId,
        inproEmpEntityId: trainer[i],
        inproModifiedDate: new Date(),
      });
    }
  }

  public async updateBatch(id: any, fields: any) {
    // Find previous batch data;
    const oldBatch = await this.findOne(id);

    // Map userEntityId from frontend
    const feTraineesId = fields.trainees.map((trainee: any) => trainee.idUser);
    // Map userEntityId from old batch data (previous)
    const oldBatchTraineeId = oldBatch.batchTrainees.map(
      (oldTrainee: any) => oldTrainee.batrTraineeEntity.userEntityId,
    );

    // Find userEntityId of removed trainee
    const removedTrainee = oldBatchTraineeId.filter(
      (old) => !feTraineesId.includes(old),
    );

    // Find userEntityId of added trainee
    const addedTrainee = feTraineesId.filter(
      (trainee: any) => !oldBatchTraineeId.includes(trainee),
    );

    // Check if technology field change
    if (fields.batchEntityId !== oldBatch.batchEntityId) {
      // Update the batch
      await this.batchProgram
        .createQueryBuilder()
        .update(Batch)
        .set({
          batchEntityId: fields.batchEntityId,
          batchName: fields.batchName,
          batchStartDate: fields.batchStartDate,
          batchEndDate: fields.batchEndDate,
          batchModifiedDate: new Date(),
        })
        .where('batchId = :id', { id: id })
        .execute();

      // If there are new trainee
      if (addedTrainee.length != 0) {
        for (let i = 0; i < addedTrainee.length; i++) {
          // Insert them to batch_trainee
          await this.addTrainee(id, addedTrainee[i]);
          await this.addBatchTraineeEvaliationSkillSet(id, addedTrainee[i]);

          // update their progress (soon)
        }
      }

      // If there are trainee that deleted
      if (removedTrainee.length != 0) {
        for (let i = 0; i < removedTrainee.length; i++) {
          // Delete them from batch_trainee
          await this.deleteTrainee(removedTrainee[i]);

          // update their progress (soon)
        }
      }

      const newBatchTraineeData = await this.findOne(id);
      const newBatchTraineeId = newBatchTraineeData.batchTrainees.map(
        (newTrainee: any) => newTrainee.batrTraineeEntity.userEntityId,
      );

      // Update trainee programEntityId
      for (let i = 0; i < newBatchTraineeId.length; i++) {
        // update programEntityId in programApply
        await this.candidateApply
          .createQueryBuilder()
          .update(ProgramApply)
          .set({ prapProgEntityId: fields.batchEntityId })
          .where('prapUserEntityId = :userId', { userId: newBatchTraineeId[i] })
          .execute();

        // update programEntityId in programApplyProgress
        await this.candidateApplyProgress
          .createQueryBuilder()
          .update(ProgramApplyProgress)
          .set({
            parogProgEntityId: fields.batchEntityId,
          })
          .where('parogUserEntityId = :userId', {
            userId: newBatchTraineeId[i],
          })
          .execute();
      }
    } else {
      await this.batchProgram
        .createQueryBuilder()
        .update(Batch)
        .set({
          batchName: fields.batchName,
          batchStartDate: fields.batchStartDate,
          batchEndDate: fields.batchEndDate,
          batchModifiedDate: new Date(),
        })
        .where('batchId = :id', { id: id })
        .execute();

      // If there are new trainee
      if (addedTrainee.length != 0) {
        for (let i = 0; i < addedTrainee.length; i++) {
          // Insert them to batch_trainee
          await this.addTrainee(id, addedTrainee[i]);
          await this.addBatchTraineeEvaliationSkillSet(id, addedTrainee[i]);

          // update their progress (soon)
        }
      }

      // If there are trainee that deleted
      if (removedTrainee.length != 0) {
        for (let i = 0; i < removedTrainee.length; i++) {
          // Delete them from batch_trainee
          await this.deleteTrainee(removedTrainee[i]);

          // update their progress (soon)
        }
      }
    }
  }

  public async getProgramEntity() {
    const getAllProgramEntity = await this.progEntity.find({
      select: {
        progEntityId: true,
        progTitle: true,
      },
    });
    return getAllProgramEntity;
  }

  public async getInstructors() {
    const getAllInstructor = await this.userRepo.find({
      where: { userCurrentRole: 4 },
    });

    return getAllInstructor;
  }

  public async findBatchEvaluation(batchId: number) {
    if (batchId) {
      const trainees = await this.batchTraineeService.find({
        relations: {
          batrTraineeEntity: true,
        },
        where: { batrBatchId: batchId },
        order: { batrTraineeEntity: { userFirstName: 'ASC' } },
      });
      return trainees || [];
    }
    return [];
  }

  public async findTraineeEvaluationScoring(userId: number) {
    if (userId) {
      const traineeEvaluation = await this.batchTraineeEvService.find({
        where: { btevTraineeEntity: { userEntityId: userId } },
        order: { btevId: 'ASC' },
      });

      const user = await this.userRepo.findOne({
        relations: {
          usersEducations: true,
        },
        where: { userEntityId: userId },
      });

      const trainee = await this.batchTraineeService.findOne({
        relations: {
          batrBatch: {
            batchEntity: true,
          },
        },
        where: { batrTraineeEntity: { userEntityId: userId } },
      });

      const traineeEvaluationData = {
        user,
        trainee,
        traineeEvaluation,
      };
      return traineeEvaluationData || null;
    }
    return {};
  }

  async addTrainee(batchId: number, userId: number) {
    const candidate = await this.candidateApply.findOne({
      where: { prapUserEntityId: userId },
    });

    const candidateTotalScore =
      (candidate.prapIqTest + candidate.prapTestScore) / 2;

    await this.batchTraineeService.save({
      batrCertificated: '0',
      batrStatus: 'Running',
      batrTotalScore: candidateTotalScore,
      batrTraineeEntity: {
        userEntityId: userId,
      },
      batrModifiedDate: new Date(),
      batrBatchId: batchId,
      batrAccessGrant: '0',
    });
  }

  public async updateBatchStats(id: number, stats: string) {
    try {
      const updateStatsBatch = await this.batchProgram.update(
        { batchId: id },
        { batchStatus: stats as any },
      );

      const updateStatsTrainee = await this.batchTraineeService.update(
        { batrBatchId: id },
        { batrStatus: stats },
      );

      return { updateStatsBatch, updateStatsTrainee };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async updateEvaluationTraineeScore(userId: number, fields: any) {
    try {
      for (const key in fields) {
        for (let i = 0; i < fields[key].length; i++) {
          await this.batchTraineeEvService.update(
            {
              btevTraineeEntity: { userEntityId: userId },
              btevType: key,
              btevSkill: fields[key][i]['btevSkill'],
            },
            {
              btevSkor: fields[key][i]['btevSkor'],
            },
          );
        }
      }
      const updatedTraineeScore = await this.findTraineeEvaluationScoring(
        userId,
      );
      return updatedTraineeScore;
    } catch (error) {
      return {
        status: 'error',
        message: error.message,
      };
    }
  }

  public async updateEvaluationTraineeReview(userId: number, fields: any) {
    if (fields.status) {
      await this.batchTraineeService.update(
        {
          batrTraineeEntity: { userEntityId: userId },
        },
        {
          batrReview: fields.review,
          batrStatus: fields.status,
        },
      );
    } else {
      await this.batchTraineeService.update(
        {
          batrTraineeEntity: { userEntityId: userId },
        },
        {
          batrReview: fields.review,
        },
      );
    }
    const evaluations = this.findBatchEvaluation(fields.batchId);
    return evaluations;
  }

  async deleteTrainee(userId: number) {
    await this.batchTraineeService.delete({
      batrTraineeEntity: {
        userEntityId: userId,
      },
    });

    await this.batchTraineeEvService.delete({
      btevTraineeEntity: {
        userEntityId: userId,
      },
    });
  }

  public async deleteBatch(id: number) {
    await this.instProg.delete({ batchId: id });
    await this.batchTraineeEvService.delete({ btevBatch: { batchId: id } });
    await this.batchTraineeService.delete({ batrBatchId: id });
    await this.batchProgram.delete({ batchId: id });
  }

  async addBatchTraineeEvaliationSkillSet(batchId: number, userId: number) {
    const evaluationSkills = [
      {
        type: 'hardskill',
        skill: ['Fundamental', 'OOP', 'Database'],
      },
      {
        type: 'softskill',
        skill: ['Communication', 'Teamwork', 'Self-Learning'],
      },
    ];
    try {
      for (let i = 0; i < evaluationSkills.length; i++) {
        const element = evaluationSkills[i];
        for (let j = 0; j < element.skill.length; j++) {
          await this.batchTraineeEvService.save({
            btevType: element.type,
            btevSkill: element.skill[j],
            btevModifiedDate: new Date(),
            btevSkor: 0,
            btevTraineeEntity: { userEntityId: userId },
            btevBatch: { batchId: batchId },
          });
        }
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
