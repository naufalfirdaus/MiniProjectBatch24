import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramApply } from 'output/entities/ProgramApply';
import { Brackets, Like, Repository } from 'typeorm';
import { PaginationDto } from './candidate.dto';
import { RoomI } from './candidate.interface';
import { RouteActions } from 'output/entities/RouteActions';
import { BatchTrainee } from 'output/entities/BatchTrainee';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(ProgramApply)
    private serviceProgram: Repository<ProgramApply>,
    @InjectRepository(BatchTrainee)
    private batchTrainee: Repository<BatchTrainee>,
    @InjectRepository(RouteActions) private serRoac: Repository<RouteActions>,
  ) {}

  public async findByStatusAndDate(
    status: string,
    month: number,
    year: number,
    options: PaginationDto,
  ): Promise<RoomI> {
    const skippedItems = (options.page - 1) * options.limit;
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
          where: [
            { prapStatus: { status: Like(`%${status}%`) } },
            { roac: { roacName: Like(`%${status}%`) } },
          ],
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
          .take(options.limit)
          .skip(skippedItems)
          .where(
            new Brackets((qb) =>
              qb
                .where('route_action.roacName LIKE :roac', {
                  roac: `%${status}%`,
                })
                .orWhere('status.status LIKE :status', {
                  status: `%${status}%`,
                }),
            ),
          )
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
          .take(options.limit)
          .skip(skippedItems)
          .where(
            new Brackets((qb) =>
              qb
                .where('route_action.roacName LIKE :roac', {
                  roac: `%${status}%`,
                })
                .orWhere('status.status LIKE :status', {
                  status: `%${status}%`,
                }),
            ),
          )
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
          .take(options.limit)
          .skip(skippedItems)
          .where(
            new Brackets((qb) =>
              qb
                .where('route_action.roacName LIKE :roac', {
                  roac: `%${status}%`,
                })
                .orWhere('status.status LIKE :status', {
                  status: `%${status}%`,
                }),
            ),
          )
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

  public async updateStatus(idusr: number, identity: number, fields: any) {
    try {
      const findRoac = await this.serRoac.findOne({
        where: { roacName: Like(`%${fields.status}%`) },
      });
      console.log(findRoac.roacId);

      const findCand = {
        prapUserEntityId: idusr,
        prapProgEntityId: identity,
      };

      if (findRoac) {
        const payload = findRoac.roacId as number;

        const updateStats = await this.serviceProgram
          .createQueryBuilder()
          .update(ProgramApply)
          .set({ roac: payload } as any)
          .where('prapUserEntityId = :idusr', {
            idusr: findCand.prapUserEntityId,
          })
          .andWhere('prapProgEntityId = :identity', {
            identity: findCand.prapProgEntityId,
          })
          .execute();

        return updateStats;
      } else {
        const updateStatus = await this.serviceProgram.update(findCand, {
          prapStatus: fields.status,
        });

        return updateStatus;
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  public async findPassedCandidateWithoutBootcamp(program: number) {
    if (program) {
      const candidates = await this.serviceProgram.find({
        relations: {
          prapUserEntity: {
            usersEducations: true,
          },
          prapStatus: true,
          prapProgEntity: true,
        },
        where: {
          prapProgEntity: { progEntityId: program },
          prapStatus: { status: 'Passed' },
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

  public async findCandidateByProgram(id: number) {
    if (id) {
      const candidates = await this.serviceProgram.find({
        relations: {
          prapUserEntity: {
            usersEducations: true,
          },
          prapStatus: true,
          prapProgEntity: true,
        },
        where: {
          prapProgEntity: { progEntityId: id },
          prapStatus: { status: 'Passed' },
        },
      });
      return candidates;
    }
    return [];
  }
}
