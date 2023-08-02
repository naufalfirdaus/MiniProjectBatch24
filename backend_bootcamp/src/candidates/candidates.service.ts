import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramApply } from 'output/entities/ProgramApply';
import { ProgramApplyProgress } from 'output/entities/ProgramApplyProgress';
import { Users } from 'output/entities/Users';
import { Like, Repository } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { PaginationDto } from './candidate.dto';
import { RoomI } from './candidate.interface';

@Injectable()
export class CandidatesService {
    constructor(
        @InjectRepository(ProgramApply) private serviceProgram: Repository<ProgramApply>
    ) {}

    public async findByDate(month: number, year: number, options : PaginationDto): Promise<RoomI> {
        try {
            const skippedItems = (options.page - 1) * options.limit;
            const totalCount = await this.serviceProgram.count();

            if(month == null){
                const queryCandidate = await this.serviceProgram.createQueryBuilder('program_apply')
                .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
                .leftJoinAndSelect('users.usersEducations', 'users_education')
                .leftJoinAndSelect('users.usersPhones', 'users_phones')
                .leftJoinAndSelect('users.usersEmails', 'users_email')
                .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
                .leftJoinAndSelect('program_entity.progCate', 'category')
                .take(options.limit)
                .skip(skippedItems)
                .where('EXTRACT(year FROM program_apply.prap_modified_date) = :year', { year: year})
                .getMany();

                return {
                    totalCount,
                    page : options.page,
                    limit : options.limit,
                    data : queryCandidate
                }
            }else if(year == null){
                const queryCandidate = await this.serviceProgram.createQueryBuilder('program_apply')
                .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
                .leftJoinAndSelect('users.usersEducations', 'users_education')
                .leftJoinAndSelect('users.usersPhones', 'users_phones')
                .leftJoinAndSelect('users.usersEmails', 'users_email')
                .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
                .leftJoinAndSelect('program_entity.progCate', 'category')
                .take(options.limit)
                .skip(skippedItems)
                .where('EXTRACT(month FROM program_apply.prap_modified_date) = :month', { month: month})
                .getMany();

                return {
                    totalCount,
                    page : options.page,
                    limit : options.limit,
                    data : queryCandidate
                }
            }else{
                const queryCandidate = await this.serviceProgram.createQueryBuilder('program_apply')
                .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
                .leftJoinAndSelect('users.usersEducations', 'users_education')
                .leftJoinAndSelect('users.usersPhones', 'users_phones')
                .leftJoinAndSelect('users.usersEmails', 'users_email')
                .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
                .leftJoinAndSelect('program_entity.progCate', 'category')
                .take(options.limit)
                .skip(skippedItems)
                .where('EXTRACT(month FROM program_apply.prap_modified_date) = :month', { month: month})
                .andWhere('EXTRACT(year FROM program_apply.prap_modified_date) = :year', { year: year})
                .getMany();

                return {
                    totalCount,
                    page : options.page,
                    limit : options.limit,
                    data : queryCandidate
                }
            }
            
        } catch (error) {
            return error.message;
        }
        
    }

    public async findByStatus(status : string, options: PaginationDto): Promise<RoomI>{
        const skippedItems = (options.page - 1) * options.limit;
        const totalCount = await this.serviceProgram.count();

        const queryBuilder = await this.serviceProgram.createQueryBuilder('program_apply')
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
        .where('route_action.roacName LIKE :roac', {roac : `%${status}%`})
        .orWhere('status.status LIKE :status', {status : `%${status}%`})
        .getMany()

        return {
            totalCount,
            page : options.page,
            limit : options.limit,
            data : queryBuilder
        }

    }
}
