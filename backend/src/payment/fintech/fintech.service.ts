import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { Fintech } from 'output/entities/Fintech';
import { Repository } from 'typeorm';

@Injectable()
export class FintechService {
  constructor(
    @InjectRepository(Fintech) private serviceFintech: Repository<Fintech>,

    @InjectRepository(BusinessEntity)
    private serviceBusinessEntity: Repository<BusinessEntity>,
  ) {}

  public async findAll(
    search: string,
    options: IPaginationOptions,
  ): Promise<Pagination<Fintech>> {
    if (!search) {
      const fintech = await this.serviceFintech.createQueryBuilder('fintech');
      return paginate(fintech, options);
    } else {
      const fintech = await this.serviceFintech
        .createQueryBuilder('fintech')
        .where(`fintech.fint_name like :name`, {
          name: `%${search}%`,
        });
      return paginate(fintech, options);
    }
  }

  public async findOne(id: number) {
    try {
      return await this.serviceFintech.findOne({
        where: {
          fintEntityId: id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  public async getAll() {
    try {
      return await this.serviceFintech.find();
    } catch (error) {
      return error.message;
    }
  }

  public async Insert(body: any) {
    try {
      const businessEntity = new BusinessEntity();

      const savedBusinessEntity = await this.serviceBusinessEntity.save(
        businessEntity,
      );

      const entity_id = savedBusinessEntity.entityId;

      const time = new Date().toISOString();

      const fint = await this.serviceFintech.save({
        fintEntityId: entity_id,
        fintCode: body.fint_code,
        fintName: body.fint_name,
        fintModifiedDate: time,
      });

      return fint;
    } catch (error) {
      return error.message;
    }
  }

  public async Update(id: number, fint_code: string, fint_name: string) {
    try {
      const time = new Date().toISOString();
      const fintech = await this.serviceFintech.update(id, {
        fintCode: fint_code,
        fintName: fint_name,
        fintModifiedDate: time,
      });

      return fintech;
    } catch (error) {
      return error.message;
    }
  }

  public async Delete(id: number) {
    try {
      return await this.serviceFintech.delete(id);
    } catch (error) {
      return error.message;
    }
  }
}
