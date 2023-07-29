import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProgramApply } from 'output/entities/ProgramApply';
import { Users } from 'output/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class CandidatesService {
    constructor(
        @InjectRepository(ProgramApply) private serviceProgram: Repository<ProgramApply>
    ) {}

    public async findByDate(month: number, year: number){
        try {
            if(month == null){
                return await this.serviceProgram.createQueryBuilder('program_apply')
                .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
                .leftJoinAndSelect('users.usersEducations', 'users_education')
                .leftJoinAndSelect('users.usersPhones', 'users_phones')
                .leftJoinAndSelect('users.usersEmails', 'users_email')
                .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
                .leftJoinAndSelect('program_entity.progCate', 'category')
                .select(['users.userFirstName', 
                         'users.userLastName', 
                         'users_education.usduSchool', 
                         'users_education.usduFieldStudy',
                         'users_education.usduGraduateYear',
                         'users_phones.uspoNumber',
                         'users_email.pmailAddress',
                         'program_entity.progTitle',
                         'category.cateName',
                         'program_apply.prapModifiedDate'])
                .where('EXTRACT(year FROM program_apply.prap_modified_date) = :year', { year: year})
                .getMany();
            }else if(year == null){
                return await this.serviceProgram.createQueryBuilder('program_apply')
                .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
                .leftJoinAndSelect('users.usersEducations', 'users_education')
                .leftJoinAndSelect('users.usersPhones', 'users_phones')
                .leftJoinAndSelect('users.usersEmails', 'users_email')
                .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
                .leftJoinAndSelect('program_entity.progCate', 'category')
                .select(['users.userFirstName', 
                         'users.userLastName', 
                         'users_education.usduSchool', 
                         'users_education.usduFieldStudy',
                         'users_education.usduGraduateYear',
                         'users_phones.uspoNumber',
                         'users_email.pmailAddress',
                         'program_entity.progTitle',
                         'category.cateName',
                         'program_apply.prapModifiedDate'])
                .where('EXTRACT(month FROM program_apply.prap_modified_date) = :month', { month: month})
                .getMany();
            }else{
                return await this.serviceProgram.createQueryBuilder('program_apply')
                .leftJoinAndSelect('program_apply.prapUserEntity', 'users')
                .leftJoinAndSelect('users.usersEducations', 'users_education')
                .leftJoinAndSelect('users.usersPhones', 'users_phones')
                .leftJoinAndSelect('users.usersEmails', 'users_email')
                .leftJoinAndSelect('program_apply.prapProgEntity', 'program_entity')
                .leftJoinAndSelect('program_entity.progCate', 'category')
                .select(['users.userFirstName', 
                         'users.userLastName', 
                         'users_education.usduSchool', 
                         'users_education.usduFieldStudy',
                         'users_education.usduGraduateYear',
                         'users_phones.uspoNumber',
                         'users_email.pmailAddress',
                         'program_entity.progTitle',
                         'category.cateName',
                         'program_apply.prapModifiedDate'])
                .where('EXTRACT(month FROM program_apply.prap_modified_date) = :month', { month: month})
                .andWhere('EXTRACT(year FROM program_apply.prap_modified_date) = :year', { year: year})
                .getMany();
            }
            
        } catch (error) {
            return error.message;
        }
        
    }
}
