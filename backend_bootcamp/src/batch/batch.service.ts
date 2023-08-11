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

  public async create(fields: any) {
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
      await this.batchTraineeService.save({
        batrCertificated: '0',
        batrStatus: 'running',
        batrTraineeEntity: {
          userEntityId: fields.trainees[i].prapUserEntityId,
        },
        batrModifiedDate: new Date(),
        batrBatchId: batch.batchId,
        batrAccessGrant: '0',
      });
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

  public async update(id: any, fields: any) {
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
          await this.batchTraineeService.save({
            batrCertificated: '0',
            batrStatus: 'running',
            batrTraineeEntity: {
              userEntityId: addedTrainee[i],
            },
            batrModifiedDate: new Date(),
            batrBatchId: id,
            batrAccessGrant: '0',
          });

          // update their progress (soon)
        }
      }

      // If there are trainee that deleted
      if (removedTrainee.length != 0) {
        for (let i = 0; i < removedTrainee.length; i++) {
          // Delete them from batch_trainee
          await this.batchTraineeService.delete({
            batrTraineeEntity: {
              userEntityId: removedTrainee[i],
            },
          });

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
          await this.batchTraineeService.save({
            batrCertificated: '0',
            batrStatus: 'running',
            batrTraineeEntity: {
              userEntityId: addedTrainee[i],
            },
            batrModifiedDate: new Date(),
            batrBatchId: id,
            batrAccessGrant: '0',
          });

          // update their progress (soon)
        }
      }

      // If there are trainee that deleted
      if (removedTrainee.length != 0) {
        for (let i = 0; i < removedTrainee.length; i++) {
          // Delete them from batch_trainee
          await this.batchTraineeService.delete({
            batrTraineeEntity: {
              userEntityId: removedTrainee[i],
            },
          });

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
}
