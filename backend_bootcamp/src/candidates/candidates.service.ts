import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramApply } from 'output/entities/ProgramApply';
import { ProgramApplyProgress } from 'output/entities/ProgramApplyProgress';
import { Users } from 'output/entities/Users';
import { Like, Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { PaginationDto } from './candidate.dto';
import { RoomI } from './candidate.interface';
import { Status } from 'output/entities/Status';
import { RouteActions } from 'output/entities/RouteActions';

@Injectable()
export class CandidatesService {
  constructor(
    @InjectRepository(ProgramApply)
    private serviceProgram: Repository<ProgramApply>,
    @InjectRepository(RouteActions) private serRoac: Repository<RouteActions>,
  ) {}

  public async findByDate(
    month: number,
    year: number,
    options: PaginationDto,
  ): Promise<RoomI> {
    try {
      const skippedItems = (options.page - 1) * options.limit;
      const totalCount = await this.serviceProgram.count();

      if (month == null) {
        const queryCandidate = await this.serviceProgram
          .createQueryBuilder('program_apply')
          .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
          .leftJoinAndSelect('users.usersEducations', 'users_education')
          .leftJoinAndSelect('users.usersPhones', 'users_phones')
          .leftJoinAndSelect('users.usersEmails', 'users_email')
          .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
          .leftJoinAndSelect('program_entity.progCate', 'category')
          .take(options.limit)
          .skip(skippedItems)
          .where(
            'EXTRACT(year FROM program_apply.prap_modified_date) = :year',
            { year: year },
          )
          .getMany();

        return {
          totalCount,
          page: options.page,
          limit: options.limit,
          data: queryCandidate,
        };
      } else if (year == null) {
        const queryCandidate = await this.serviceProgram
          .createQueryBuilder('program_apply')
          .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
          .leftJoinAndSelect('users.usersEducations', 'users_education')
          .leftJoinAndSelect('users.usersPhones', 'users_phones')
          .leftJoinAndSelect('users.usersEmails', 'users_email')
          .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
          .leftJoinAndSelect('program_entity.progCate', 'category')
          .take(options.limit)
          .skip(skippedItems)
          .where(
            'EXTRACT(month FROM program_apply.prap_modified_date) = :month',
            { month: month },
          )
          .getMany();

        return {
          totalCount,
          page: options.page,
          limit: options.limit,
          data: queryCandidate,
        };
      } else {
        const queryCandidate = await this.serviceProgram
          .createQueryBuilder('program_apply')
          .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
          .leftJoinAndSelect('users.usersEducations', 'users_education')
          .leftJoinAndSelect('users.usersPhones', 'users_phones')
          .leftJoinAndSelect('users.usersEmails', 'users_email')
          .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
          .leftJoinAndSelect('program_entity.progCate', 'category')
          .take(options.limit)
          .skip(skippedItems)
          .where(
            'EXTRACT(month FROM program_apply.prap_modified_date) = :month',
            { month: month },
          )
          .andWhere(
            'EXTRACT(year FROM program_apply.prap_modified_date) = :year',
            { year: year },
          )
          .getMany();

        return {
          totalCount,
          page: options.page,
          limit: options.limit,
          data: queryCandidate,
        };
      }
    } catch (error) {
      return error.message;
    }
  }

  public async findByStatus(
    status: string,
    options: PaginationDto,
  ): Promise<RoomI> {
    const skippedItems = (options.page - 1) * options.limit;
    const totalCount = await this.serviceProgram.count();

    const queryBuilder = await this.serviceProgram
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
      .where('route_action.roacName LIKE :roac', { roac: `%${status}%` })
      .orWhere('status.status LIKE :status', { status: `%${status}%` })
      .getMany();

    return {
      totalCount,
      page: options.page,
      limit: options.limit,
      data: queryBuilder,
    };
  }

  public async updateStatus(idusr: number, identity: number, fields: any) {
    try {
      // const findid = await this.serviceProgram.findOne({ where : {prapUserEntityId : idusr, prapProgEntityId : identity}})
      // const findByStats = await this.serStas.findOne({ where : fields.status})
      // const payload = {
      //     prapStatus : fields.status
      // }

      // if(findid && findByStats){
      //     return await this.serviceProgram.save(payload)
      // }

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

      // const updateStatus = await this.serviceProgram.update(findCand, { prapStatus : fields.status})

      // return updateStatus;
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
          prapStatus: [{ status: 'Passed' }, { status: 'Recommended' }],
        },
      });
      return candidates;
    }
    return [];
  }
}
