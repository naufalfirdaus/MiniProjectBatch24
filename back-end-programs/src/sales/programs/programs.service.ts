import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'output/entities/Users';
import { UsersEducation } from 'output/entities/UsersEducation';
import { UsersMedia } from 'output/entities/UsersMedia';
import { ILike, Like, Repository } from 'typeorm';
import { UsersDto } from './dto/programs-users.dto';
import { UsersEducationDto } from './dto/programs-users-education.dto';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { ProgramApplyProgress } from 'output/entities/ProgramApplyProgress';
import { ProgramApply } from 'output/entities/ProgramApply';
import { Status } from 'output/entities/Status';
import { Employee } from 'output/entities/Employee';
import { RouteActions } from 'output/entities/RouteActions';
import { PaginationDto } from './dto/programs-pagination.dto';
import { PaginationInterface } from './interface/pagination.interface';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Users) private serviceU: Repository<Users>,
    @InjectRepository(UsersEducation)
    private serviceUE: Repository<UsersEducation>,
    @InjectRepository(UsersMedia)
    private serviceUM: Repository<UsersMedia>,
    @InjectRepository(ProgramEntity)
    private servicePE: Repository<ProgramEntity>,
    @InjectRepository(ProgramApplyProgress)
    private servicePAP: Repository<ProgramApplyProgress>,
    @InjectRepository(ProgramApply) private servicePA: Repository<ProgramApply>,
    @InjectRepository(Employee) private serviceE: Repository<Employee>,
  ) {}

  private order(orderBy: string) {
    // set order by clause
    // let order = '';
    // if (orderBy === 'Online/Offline') {
    //   order = 'programEntity.progLearningType';
    // } else if (orderBy === 'Latest') {
    //   order = 'programEntity.progModifiedDate';
    // } else {
    //   order = 'programEntity.progRating';
    // }
    let orderObject: { [key: string]: 'DESC' } = {};

    if (orderBy === 'Online/Offline') {
      orderObject = { progLearningType: 'DESC' };
    } else if (orderBy === 'Latest') {
      orderObject = { progModifiedDate: 'DESC' };
    } else {
      orderObject = { progRating: 'DESC' };
    }

    // return order;
    return orderObject;
  }

  public async findAll(orderBy: string): Promise<ProgramEntity[]> {
    try {
      // get all available bootcamp data
      const order = this.order(orderBy);

      return await this.servicePE
        .createQueryBuilder('programEntity')
        // .orderBy(order, 'DESC')
        .getMany();
    } catch (error) {
      return error.message;
    }
  }

  public async findSearch(
    orderBy: string,
    search: string,
    options: PaginationDto,
  ): Promise<PaginationInterface> {
    try {
      // get searched boorcamp data
      // const order = this.order(orderBy);

      // const search = await this.servicePE
      //   .createQueryBuilder('programEntity')
      //   .where('programEntity.progTitle ILIKE :name', {
      //     name: `%${name}%`,
      //   })
      //   .orderBy(order, 'DESC');

      // return paginate(search, options);

      const order = this.order(orderBy);

      const skippedItems = (options.page - 1) * options.limit;
      if (search) {
        const totalCount = await this.servicePE.count({
          where: {
            progTitle: ILike(`%${search}%`),
          },
        });
        const programs = await this.servicePE.find({
          take: options.limit,
          skip: skippedItems,
          where: {
            progTitle: ILike(`%${search}%`),
          },
          order: order,
        });
        return {
          totalCount,
          page: options.page,
          limit: options.limit,
          data: programs,
        };
      } else {
        const totalCount = await this.servicePE.count();
        const programs = await this.servicePE.find({
          take: options.limit,
          skip: skippedItems,
          order: order,
        });

        return {
          totalCount,
          page: options.page,
          limit: options.limit,
          data: programs,
        };
      }
    } catch (error) {
      return error.message;
    }
  }

  public async getDashboard(userEntityId: number) {
    try {
      // get bootcamp dashboard data of user
      const query = `SELECT 
          DISTINCT ON (pe.prog_entity_id)
          u.user_entity_id AS "userEntityId",
          u.user_first_name AS "userFirstName",
          u.user_last_name AS "userLastName",
          pe.prog_entity_id AS "progEntityId",
          pe.prog_title AS "progTitle",
          pe.prog_image AS "progImage",
          pa.prap_status AS "prapStatus",
          pa.prap_modified_date AS "prapApplyDate",
          ra.roac_id AS "roacId",
          ra.roac_name AS "latestProgress"
      FROM users.users u
      JOIN bootcamp.program_apply pa ON pa.prap_user_entity_id = u.user_entity_id
      JOIN bootcamp.program_apply_progress pap ON pap.parog_user_entity_id = pa.prap_user_entity_id
      JOIN curriculum.program_entity pe ON pe.prog_entity_id = pap.parog_prog_entity_id
      JOIN master.route_actions ra ON ra.roac_id = pap.parog_roac_id
      WHERE u.user_entity_id = $1::integer AND pa.prap_prog_entity_id = pap.parog_prog_entity_id
      ORDER BY pe.prog_entity_id, ra.roac_id DESC;`;
      const param = [userEntityId];

      const dashboard = await this.serviceU.query(query, param);

      return dashboard;
    } catch (error) {
      return error.message;
    }
  }

  public async getUser(userEntityId: number): Promise<Users> {
    try {
      // get user data
      const User = await this.serviceU.findOne({
        where: { userEntityId: userEntityId },
      });
      return User;
    } catch (error) {
      return error.message;
    }
  }

  public async getUserEdu(userEntityId: number): Promise<UsersEducation> {
    try {
      // get user education data
      const userEdu = await this.serviceUE.findOne({
        where: { usduEntityId: userEntityId },
      });
      return userEdu;
    } catch (error) {
      return error.message;
    }
  }

  public async getUserMedia(
    userEntityId: number,
    note: string,
  ): Promise<UsersMedia> {
    try {
      // get user media data based on file note
      const userMedia = await this.serviceUM.findOne({
        where: {
          usmeEntityId: userEntityId,
          usmeNote: note,
        },
      });
      return userMedia;
    } catch (error) {
      return error.message;
    }
  }

  private getFileType(file: string) {
    // set usme filetype
    let fileType = '';

    if (file === 'application/pdf') {
      fileType = 'pdf';
    } else if (file === 'image/jpeg') {
      fileType = 'jpg';
    } else if (
      file ===
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      fileType = 'word';
    } else {
      throw new BadRequestException(
        'Unable to take file format. Only .jpg, .pdf, and .docx are allowed',
      );
    }

    return fileType;
  }

  public async getProgramApply(
    userEntityId: number,
    progEntityId: number,
  ): Promise<ProgramApply> {
    try {
      //get program apply data
      const apply = await this.servicePA.findOne({
        where: {
          prapUserEntityId: userEntityId,
          prapProgEntityId: progEntityId,
        },
      });

      return apply;
    } catch (error) {
      error.message;
    }
  }

  public async updateUsers(
    userEntityId: number,
    progEntityId: number,
    user: UsersDto,
    education: UsersEducationDto,
    file: any,
  ) {
    try {
      let updateCv;
      let apply;
      const checkApply = await this.getProgramApply(userEntityId, progEntityId);

      if (!checkApply) {
        apply = await this.applyBootcamp(userEntityId, progEntityId);
      }

      console.log(checkApply);

      // upload / create new users cv
      if (file) {
        const FileType = this.getFileType(file.mimetype);

        const cvData = {
          usmeEntityId: userEntityId,
          usmeFileLink: `http://localhost:3001/programs/image/${file.originalname}`,
          usmeFilename: file.originalname,
          usmeFilesize: file.size,
          usmeNote: 'Curicullum Vitae',
          usmeFiletype: FileType,
          usmeModifiedDate: new Date(),
        };

        let getCV = await this.getUserMedia(userEntityId, 'Curicullum Vitae');

        if (getCV) {
          getCV = { ...getCV, ...cvData };
        } else {
          getCV = this.serviceUM.create(cvData);
        }

        updateCv = await this.serviceUM.save(getCV);
      }

      // update users data
      const getUser = await this.getUser(userEntityId);

      getUser.userFirstName = user.firstName;
      getUser.userLastName = user.lastName;
      getUser.userBirthDate = user.birthDate;

      const usersUpdate = await this.serviceU.save(getUser);

      // update users education data
      let getUserEdu = await this.getUserEdu(userEntityId);

      const userEduData = {
        usduSchool: education.school,
        usduDegree: education.degree,
        usduFieldStudy: education.fieldStudy,
      };

      if (getUserEdu) {
        getUserEdu = { ...getUserEdu, ...userEduData };
      } else {
        getUserEdu = this.serviceUE.create(userEduData);
      }

      const usersEduUpdate = await this.serviceUE.save(getUserEdu);

      return { usersUpdate, usersEduUpdate, updateCv, apply };
    } catch (error) {
      return error.message;
    }
  }

  public async uploadUserPhoto(userEntityId: number, image: any) {
    try {
      const FileType = this.getFileType(image.mimetype);

      // update users userPhoto
      const getUser = await this.getUser(userEntityId);

      getUser.userPhoto = image.originalname;
      getUser.userModifiedDate = new Date();

      const usersUpdate = await this.serviceU.save(getUser);

      // update / create profile picture in userMedia
      const photoData = {
        usmeEntityId: userEntityId,
        usmeFileLink: `http://localhost:3001/programs/image/${image.originalname}`,
        usmeFilename: image.originalname,
        usmeFilesize: image.size,
        usmeNote: 'Profile Photo',
        usmeFiletype: FileType,
        usmeModifiedDate: new Date(),
      };

      let Photo = await this.getUserMedia(userEntityId, 'Profile Photo');

      if (Photo) {
        Photo = { ...Photo, ...photoData };
      } else {
        Photo = this.serviceUM.create(photoData);
      }

      const newPhoto = await this.serviceUM.save(Photo);

      return { usersUpdate, newPhoto };
    } catch (error) {
      return error.message;
    }
  }

  public async getProgress(
    userEntityId: number,
    progEntityId: number,
  ): Promise<ProgramApplyProgress[]> {
    try {
      console.log('user ', userEntityId);
      console.log('prog ', progEntityId);

      // get bootcamp apply progress data
      const progress = await this.servicePAP.find({
        where: {
          parogUserEntityId: userEntityId,
          parogProgEntityId: progEntityId,
        },
        relations: {
          parogRoac: true,
        },
      });

      return progress;
    } catch (error) {
      return error.message;
    }
  }

  async getBootcampAndMentorDetails(progEntityId: number) {
    const query = `
    SELECT  
      pe.prog_entity_id AS "progEntityId",
      pe.prog_title AS "progTitle",
      pe.prog_headline AS "progHeadline",
      pe.prog_total_trainee AS "progTotalTrainee",
      pe.prog_price AS "progPrice",
      pe.prog_duration AS "progDuration",
      pe.prog_duration_type AS "progDurationType",
      pe.prog_city_id AS "progCityId",
      pe.prog_created_by AS "progCreatedBy",
      u.user_entity_id AS "userEntityId",
      u.user_first_name AS "userFirstName",
      u.user_last_name AS "userLastName",
      u.user_photo AS "userPhoto"
    FROM curriculum.program_entity pe
    JOIN hr.employee e on e.emp_entity_id = pe.prog_created_by
    JOIN users.users u on u.user_entity_id = e.emp_entity_id
    WHERE pe.prog_entity_id = $1::integer;
    `;

    const params = [progEntityId];
    const result = await this.serviceE.query(query, params);
    return result;
  }

  async getLearnItems(progEntityId: number) {
    const query = `
    SELECT 
      pred_item_learning AS "predItemLearning" 
    FROM curriculum.program_entity_description 
    WHERE pred_prog_entity_id = $1::integer;
    `;

    const params = [progEntityId];
    const result = await this.serviceE.query(query, params);
    return result;
  }

  async getBootcampMaterial(progEntityId: number) {
    const query = `
    SELECT 
      s.sect_id AS "sectId",
      s.sect_prog_entity_id AS "sectProgEntity",
      s.sect_title AS "sectTitle",
      JSONB_AGG(JSON_BUILD_OBJECT('secdId', sd.secd_id, 'secdTitle', sd.secd_title)) AS "sectionDetails"
    FROM curriculum.sections s
    JOIN curriculum.section_detail sd ON s.sect_id = sd.secd_sect_id
    WHERE s.sect_prog_entity_id = $1::integer
    GROUP BY s.sect_id, s.sect_prog_entity_id;
    `;

    const params = [progEntityId];
    const result = await this.serviceE.query(query, params);
    return result;
  }

  async getProgramReviews(progEntityId: number) {
    const query = `
    SELECT 
      pr.prow_user_entity_id AS "prowUserEntity",
      pr.prow_prog_entity_id AS "prowProgEntity",
      pr.prow_review AS "prowReview",
      pr.prow_rating AS "prowRating",
      u.user_entity_id AS "reviewUserEntityId",
      u.user_first_name AS "reviewUserFirstName",
      u.user_last_name AS "reviewUserLastName",
      u.user_photo AS "reviewUserPhoto"
    FROM curriculum.program_reviews pr
    JOIN users.users u on u.user_entity_id = pr.prow_user_entity_id
    WHERE pr.prow_prog_entity_id = $1::integer;
    `;

    const params = [progEntityId];
    const result = await this.serviceE.query(query, params);
    return result;
  }

  async getLocationDetails(progEntityId: number) {
    const query = `
      SELECT
      c.country_name AS country,
      p.prov_name as province,
      cy.city_name as city
    FROM master.country c
    JOIN master.province p ON p.prov_country_code = c.country_code
    JOIN master.city cy ON cy.city_prov_id = p.prov_id
    JOIN curriculum.program_entity pe ON pe.prog_city_id = cy.city_id
    WHERE pe.prog_entity_id = $1::integer;
    `;

    const params = [progEntityId];
    const result = await this.serviceE.query(query, params);
    return result;
  }

  async getEndBatchDate(progEntityId: number) {
    const query = `
    SELECT 
      b.batch_end_date AS "endDate",
      b.batch_name AS "batchName",
      b.batch_description as "batchDescription"
    FROM bootcamp.batch b
    WHERE b.batch_entity_id = $1::integer AND b.batch_status = 'Running';
    `;

    const params = [progEntityId];
    const result = await this.serviceE.query(query, params);
    return result;
  }

  async getStartBatchDate(progEntityId: number) {
    const query = `
    SELECT 
      b.batch_start_date AS "startDate"
    FROM bootcamp.batch b
    WHERE b.batch_entity_id = $1::integer AND b.batch_status = 'Pending';
    `;

    const params = [progEntityId];
    const result = await this.serviceE.query(query, params);
    return result;
  }

  async viewDetail(progEntityId: number) {
    try {
      const [bootcampAndMentor] = await this.getBootcampAndMentorDetails(
        progEntityId,
      );
      const [learnItems] = await this.getLearnItems(progEntityId);
      const material = await this.getBootcampMaterial(progEntityId);
      const review = await this.getProgramReviews(progEntityId);
      const [location] = await this.getLocationDetails(progEntityId);
      const [endDate] = await this.getEndBatchDate(progEntityId);
      const [startDate] = await this.getStartBatchDate(progEntityId);

      return {
        bootcampAndMentor,
        learnItems,
        material,
        review,
        location,
        endDate,
        startDate,
      };
    } catch (error) {
      return error.message;
    }
  }

  public async applyBootcamp(userEntityId: number, progEntityId: number) {
    try {
      // create new bootcamp apply application

      const Apply = this.servicePA.create({
        prapUserEntityId: userEntityId,
        prapProgEntityId: progEntityId,
        prapTestScore: 0,
        prapGpa: 0,
        prapIqTest: 0,
        prapReview: null,
        prapModifiedDate: new Date(),
        prapStatus: { status: 'Apply' } as Status,
      });

      const createApply = await this.servicePA.save(Apply);

      const parogEmp = await this.serviceE
        .createQueryBuilder('employee')
        .select('employee.emp_entity_id AS "empEntityId"')
        .where('employee.empJoro = :empJoroId', { empJoroId: 5 })
        .andWhere('employee.empCurrentFlag = :empCurrentFlag', {
          empCurrentFlag: 1,
        })
        .getRawOne();

      const ApplyProgress = this.servicePAP.create({
        parogUserEntityId: userEntityId,
        parogProgEntityId: progEntityId,
        parogActionDate: new Date(),
        parogModifiedDate: new Date(),
        parogComment: null,
        parogProgressName: 'Done',
        parogEmpEntity: { empEntityId: parogEmp.empEntityId } as Employee,
        parogStatus: { status: 'Open' } as Status,
        parogRoac: { roacId: 1 } as RouteActions,
      });

      const createApplyProgress = await this.servicePAP.save(ApplyProgress);

      return { createApply, createApplyProgress };
    } catch (error) {
      return error.message;
    }
  }
}
