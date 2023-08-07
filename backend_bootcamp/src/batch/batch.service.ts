import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Batch } from 'output/entities/Batch';
import { Repository } from 'typeorm';
import { PaginationDto } from './batc.dto';
import { RoomI } from './batc.interface';
import { ProgramEntity } from 'output/entities/ProgramEntity';
import { Category } from 'output/entities/Category';
import { InstructorPrograms } from 'output/entities/InstructorPrograms';
import { Users } from 'output/entities/Users';
import { Employee } from 'output/entities/Employee';

@Injectable()
export class BatchService {
  constructor(
    @InjectRepository(Batch) private batchProgram: Repository<Batch>,
    @InjectRepository(ProgramEntity)
    private progEntity: Repository<ProgramEntity>,
    @InjectRepository(Category) private catEntity: Repository<Category>,
    @InjectRepository(InstructorPrograms)
    private instProg: Repository<InstructorPrograms>,
    @InjectRepository(Users) private userRepo: Repository<Users>,
    @InjectRepository(Employee) private empRepo: Repository<Employee>,
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
      .leftJoinAndSelect('batch_trainee.batrTraineeEntity', 'user')
      .where('batch.batchId = :id', { id: id })
      .getOne();

    return queryBatch;
  }

  public async create(fields: any) {
    console.log(fields);
    // const findTechByCat = await this.catEntity.findOne({where : { cateName : Like(`%${fields.tech}%`) }})
    // console.log(findTechByCat.cateId)

    // const findtProgEntity =  await this.progEntity.findOne({where : { progCate : findTechByCat.cateId as any}})
    // console.log({findtProgEntity})

    // const findTechByCat = await this.catEntity
    //   .createQueryBuilder('category')
    //   .where('category.cateName Like :name', { name: `%${fields.tech}%` })
    //   .getOne();

    // console.log(findTechByCat.cateId);

    // const findProgEntity = await this.progEntity
    //   .createQueryBuilder('program_entity')
    //   .where('program_entity.progCate = :id', { id: findTechByCat.cateId })
    //   .getOne();

    // console.log(findProgEntity.progEntityId);

    // const batch = await this.batchProgram.save({
    //   batchName: fields.name,
    //   batchEntityId: findProgEntity.progEntityId,
    //   batchStartDate: new Date(fields.datestart),
    //   batchEndDate: new Date(fields.dateend),
    //   batchModifiedDate: new Date(),
    // });

    // // const findTrainId = await this.userRepo.findOne({where : { userFirstName : Like(`%${fields.nameins}%`)}})
    // const findTrainId = await this.userRepo
    //   .createQueryBuilder('users')
    //   .where(
    //     "CONCAT(users.userFirstName, ' ', users.userLastName) Like :fullname",
    //     { fullname: `%${fields.nameins}%` },
    //   )
    //   .getOne();
    // console.log(findTrainId.userEntityId);

    // const findEmpId = await this.empRepo
    //   .createQueryBuilder('employee')
    //   .where('employee.empEntityId = :id', { id: findTrainId.userEntityId })
    //   .getOne();
    // console.log(findEmpId.empEntityId);

    // const instructor = await this.instProg.save({
    //   batchId: batch.batchId,
    //   inproEntityId: findProgEntity.progEntityId,
    //   inproEmpEntityId: findEmpId.empEntityId,
    // });
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
}
