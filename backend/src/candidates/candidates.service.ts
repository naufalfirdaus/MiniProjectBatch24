import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramApply } from 'output/entities/ProgramApply';
import { Brackets, Like, Repository, Not } from 'typeorm';
import { PaginationDto } from './candidate.dto';
import { RoomI } from './candidate.interface';
import { RouteActions } from 'output/entities/RouteActions';
import { BatchTrainee } from 'output/entities/BatchTrainee';
import { ProgramApplyProgress } from 'output/entities/ProgramApplyProgress';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(ProgramApply)
    private serviceProgram: Repository<ProgramApply>,
    @InjectRepository(BatchTrainee)
    private batchTrainee: Repository<BatchTrainee>,
    @InjectRepository(RouteActions) private serRoac: Repository<RouteActions>,
    @InjectRepository(ProgramApplyProgress)
    private programApplyProgressService: Repository<ProgramApplyProgress>,
  ) {}

  public async findByStatusAndDate(
    status: string,
    month: number,
    year: number,
    options: PaginationDto,
  ): Promise<RoomI> {
    let candidatesFilter = [];
    if (status) {
      if (!month && !year) {
        candidatesFilter = await this.serviceProgram.find({
          relations: {
            prapUserEntity: {
              usersEmails: true,
              usersEducations: true,
              usersPhones: true,
            },
            prapProgEntity: true,
            roac: true,
            prapStatus: true,
          },
          where: { prapStatus: { status: Like(`%${status}%`) } },
        });
      } else if (!year) {
        candidatesFilter = await this.serviceProgram
          .createQueryBuilder('program_apply')
          .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
          .leftJoinAndSelect('users.usersEducations', 'users_education')
          .leftJoinAndSelect('users.usersPhones', 'users_phones')
          .leftJoinAndSelect('users.usersEmails', 'users_email')
          .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
          .leftJoinAndSelect('program_entity.progCate', 'category')
          .leftJoinAndSelect('program_apply.roac', 'route_action')
          .leftJoinAndSelect('program_apply.prapStatus', 'status')
          .where('status.status LIKE :status', { status: `%${status}%` })
          .andWhere(
            'EXTRACT(month FROM program_apply.prap_modified_date) = :month',
            { month: month },
          )
          .getMany();
      } else if (!month) {
        candidatesFilter = await this.serviceProgram
          .createQueryBuilder('program_apply')
          .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
          .leftJoinAndSelect('users.usersEducations', 'users_education')
          .leftJoinAndSelect('users.usersPhones', 'users_phones')
          .leftJoinAndSelect('users.usersEmails', 'users_email')
          .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
          .leftJoinAndSelect('program_entity.progCate', 'category')
          .leftJoinAndSelect('program_apply.roac', 'route_action')
          .leftJoinAndSelect('program_apply.prapStatus', 'status')
          .where('status.status LIKE :status', { status: `%${status}%` })
          .andWhere(
            'EXTRACT(year FROM program_apply.prap_modified_date) = :year',
            { year: year },
          )
          .getMany();
      } else {
        candidatesFilter = await this.serviceProgram
          .createQueryBuilder('program_apply')
          .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
          .leftJoinAndSelect('users.usersEducations', 'users_education')
          .leftJoinAndSelect('users.usersPhones', 'users_phones')
          .leftJoinAndSelect('users.usersEmails', 'users_email')
          .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
          .leftJoinAndSelect('program_entity.progCate', 'category')
          .leftJoinAndSelect('program_apply.roac', 'route_action')
          .leftJoinAndSelect('program_apply.prapStatus', 'status')
          .where('status.status LIKE :status', { status: `%${status}%` })
          .andWhere(
            new Brackets((qb) =>
              qb
                .where(
                  'EXTRACT(month FROM program_apply.prap_modified_date) = :month',
                  { month: month },
                )
                .andWhere(
                  'EXTRACT(year FROM program_apply.prap_modified_date) = :year',
                  { year: year },
                ),
            ),
          )
          .getMany();
      }
    }

    return {
      totalCount: candidatesFilter.length,
      page: options.page,
      limit: options.limit,
      data: candidatesFilter,
    };
  }

  public async switchStatus(idusr: number, fields: any) {
    try {
      if (fields.score != 0) {
        await this.serviceProgram.update(
          { prapUserEntityId: idusr },
          {
            prapStatus: { status: fields.status },
            prapTestScore: fields.score,
            prapReview: fields.review,
          },
        );
      } else {
        await this.serviceProgram.update(
          { prapUserEntityId: idusr },
          { prapStatus: { status: fields.status } },
        );
      }

      if (fields.status != 'Recommendation' || fields.status != 'Passed') {
        await this.programApplyProgressService.save({
          parogUserEntityId: idusr,
          parogProgEntityId: fields.progId,
          parogActionDate: new Date(),
          parogModifiedDate: new Date(),
          parogProgressName: 'done',
          routeAction: {
            roacId: fields.status == 'Ready Test' ? 2 : 3,
          },
        });
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async findPassedCandidateWithoutBootcamp(
    program: number,
    month: number,
    year: number,
  ) {
    let candidates = [];
    if (program) {
      if (!month && !year) {
        candidates = await this.serviceProgram.find({
          relations: {
            prapUserEntity: {
              usersEducations: true,
            },
            prapStatus: true,
            prapProgEntity: true,
          },
          where: {
            prapProgEntity: { progEntityId: program },
            prapStatus: [{ status: 'Passed' }, { status: 'Recommendation' }],
          },
        });
      } else if (!year) {
        candidates = await this.serviceProgram
          .createQueryBuilder('program_apply')
          .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
          .leftJoinAndSelect('users.usersEducations', 'users_education')
          .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
          .leftJoinAndSelect('program_apply.prapStatus', 'status')
          .where(
            new Brackets((qb) =>
              qb
                .where('program_entity.progEntityId = :program', {
                  program,
                })
                .andWhere(
                  'EXTRACT(month FROM program_apply.prap_modified_date) = :month',
                  { month: month },
                ),
            ),
          )
          .andWhere(
            new Brackets((qb) =>
              qb
                .where('status.status = :pass', { pass: 'Passed' })
                .orWhere('status.status = :rec', {
                  rec: 'Recommendation',
                }),
            ),
          )
          .getMany();
      } else if (!month) {
        candidates = await this.serviceProgram
          .createQueryBuilder('program_apply')
          .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
          .leftJoinAndSelect('users.usersEducations', 'users_education')
          .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
          .leftJoinAndSelect('program_apply.prapStatus', 'status')
          .where(
            new Brackets((qb) =>
              qb
                .where('program_entity.progEntityId = :program', {
                  program,
                })
                .andWhere(
                  'EXTRACT(year FROM program_apply.prap_modified_date) = :year',
                  { year: year },
                ),
            ),
          )
          .andWhere(
            new Brackets((qb) =>
              qb
                .where('status.status = :pass', { pass: 'Passed' })
                .orWhere('status.status = :rec', {
                  rec: 'Recommendation',
                }),
            ),
          )
          .getMany();
      } else {
        candidates = await this.serviceProgram
          .createQueryBuilder('program_apply')
          .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
          .leftJoinAndSelect('users.usersEducations', 'users_education')
          .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
          .leftJoinAndSelect('program_apply.prapStatus', 'status')
          .where(
            new Brackets((qb) =>
              qb
                .where('program_entity.progEntityId = :program', {
                  program,
                })
                .andWhere(
                  'EXTRACT(month FROM program_apply.prap_modified_date) = :month',
                  { month: month },
                )
                .andWhere(
                  'EXTRACT(year FROM program_apply.prap_modified_date) = :year',
                  { year: year },
                ),
            ),
          )
          .andWhere(
            new Brackets((qb) =>
              qb
                .where('status.status = :pass', { pass: 'Passed' })
                .orWhere('status.status = :rec', {
                  rec: 'Recommendation',
                }),
            ),
          )
          .getMany();
      }

      const trainees = await this.batchTrainee.find({
        select: {
          batrTraineeEntity: {
            userEntityId: true,
          },
        },
        relations: {
          batrTraineeEntity: true,
        },
      });

      const traineesId = trainees.map(
        (trainee) => trainee.batrTraineeEntity.userEntityId,
      );

      const filteredCandidates = candidates.filter(
        (candidate) => !traineesId.includes(candidate.prapUserEntityId),
      );

      return filteredCandidates;
    }
    return [];
  }

  public async findCandidateAndBatchTrainee(
    programId: number,
    batchId: number,
  ) {
    if (programId && batchId) {
      const candidates = await this.serviceProgram.find({
        relations: {
          prapUserEntity: {
            usersEducations: true,
          },
          prapStatus: true,
          prapProgEntity: true,
        },
        where: {
          prapProgEntity: { progEntityId: programId },
          prapStatus: [{ status: 'Passed' }, { status: 'Recommendation' }],
        },
      });

      const trainees = await this.batchTrainee.find({
        select: {
          batrTraineeEntity: {
            userEntityId: true,
          },
        },
        relations: {
          batrTraineeEntity: true,
          batrBatch: { batchEntity: true },
        },
        where: {
          batrBatch: { batchEntityId: programId },
          batrBatchId: Not(batchId),
        },
      });

      const traineesId = trainees.map(
        (trainee) => trainee.batrTraineeEntity.userEntityId,
      );

      const filteredCandidates = candidates.filter(
        (candidate: any) => !traineesId.includes(candidate.prapUserEntityId),
      );

      return filteredCandidates;
    }
    return [];
  }
}
