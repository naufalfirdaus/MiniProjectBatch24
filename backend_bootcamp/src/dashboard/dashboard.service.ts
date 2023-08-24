import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BatchTrainee } from 'output/entities/BatchTrainee';
import { ProgramApply } from 'output/entities/ProgramApply';
import { Raw, Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(ProgramApply)
    private programApplyService: Repository<ProgramApply>,
    @InjectRepository(BatchTrainee)
    private batchTraineeService: Repository<BatchTrainee>,
  ) {}

  public async getCount() {
    const allCandidate = await this.programApplyService.count();
    const onTraining = await this.batchTraineeService.count();

    return { allCandidate, onTraining, onBoarding: 0, idle: 0 };
  }

  public async getChart(year: number) {
    const interestTech = await this.programApplyService
      .createQueryBuilder('program_apply')
      .select('COUNT(program_apply.prap_user_entity_id)::int as y')
      .addSelect('program_entity.prog_title as x')
      .leftJoin('program_apply.prapProgEntity', 'program_entity')
      .groupBy('program_entity.prog_entity_id')
      .getRawMany();

    const educations = await this.programApplyService
      .createQueryBuilder('program_apply')
      .select('COUNT(program_apply.prap_user_entity_id)::int as total')
      .addSelect('users_education.usdu_degree as degree')
      .leftJoin('program_apply.prapUserEntity', 'users')
      .leftJoin('users.usersEducations', 'users_education')
      .groupBy('users_education.usdu_degree')
      .getRawMany();

    const university = await this.programApplyService
      .createQueryBuilder('program_apply')
      .select('COUNT(program_apply.prap_user_entity_id)::int as total')
      .addSelect('users_education.usdu_school as school')
      .leftJoin('program_apply.prapUserEntity', 'users')
      .leftJoin('users.usersEducations', 'users_education')
      .groupBy('users_education.usdu_school')
      .getRawMany();

    const fieldStudy = await this.programApplyService
      .createQueryBuilder('program_apply')
      .select('COUNT(program_apply.prap_user_entity_id)::int as total')
      .addSelect('users_education.usdu_field_study as fieldStudy')
      .leftJoin('program_apply.prapUserEntity', 'users')
      .leftJoin('users.usersEducations', 'users_education')
      .groupBy('users_education.usdu_field_study')
      .getRawMany();

    const applicantByMonth = [];
    let findedData = [];
    for (let i = 1; i <= 12; i++) {
      if (year) {
        findedData = await this.programApplyService
          .createQueryBuilder('program_apply')
          .select('*')
          .where(
            'EXTRACT(month FROM program_apply.prap_modified_date) = :month',
            { month: i },
          )
          .andWhere(
            'EXTRACT(year FROM program_apply.prap_modified_date) = :year',
            { year },
          )
          .execute();
      } else {
        findedData = await this.programApplyService.find({
          where: {
            prapModifiedDate: Raw(
              (alias) => `EXTRACT(month FROM ${alias}) = ${i}`,
            ),
          },
        });
      }
      applicantByMonth.push(findedData.length);
    }

    return {
      interestTech,
      educations,
      university,
      fieldStudy,
      applicantByMonth,
    };
  }
}
