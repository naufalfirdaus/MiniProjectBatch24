import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'output/entities/Bank';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { BusinessEntity } from 'output/entities/BusinessEntity';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private serviceBank: Repository<Bank>,

    @InjectRepository(BusinessEntity)
    private serviceBusinessEntity: Repository<BusinessEntity>
  ) {}

  public async findAll(
    search: string,
    options: IPaginationOptions
  ): Promise<Pagination<Bank>> {
    if (!search) {
      const bank = await this.serviceBank.createQueryBuilder('bank');
      return paginate(bank, options);
    } else {
      const bank = await this.serviceBank
        .createQueryBuilder('bank')
        .where(`bank.bank_name like :name`, {
          name: `%${search}%`,
        });
      return paginate(bank, options);
    }
  }

  public async getAll() {
    try {
      return await this.serviceBank.find();
    } catch (error) {
      return error.message;
    }
  }

  public async findOne(id: number) {
    try {
      return await this.serviceBank.findOne({
        where: {
          bankEntityId: id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }

  public async Insert(body: any) {
    try {
      const businessEntity = new BusinessEntity();

      const savedBusinessEntity = await this.serviceBusinessEntity.save(
        businessEntity
      );

      const entity_id = savedBusinessEntity.entityId;
      const time = new Date().toISOString();

      const bank = await this.serviceBank.save({
        bankEntityId: entity_id,
        bankCode: body.bank_code,
        bankName: body.bank_name,
        bankModifiedDate: time,
      });

      return bank;
    } catch (error) {
      return error.message;
    }
  }

  public async Update(id: number, bank_code: string, bank_name: string) {
    try {
      const time = new Date().toISOString();
      const bank = await this.serviceBank.update(id, {
        bankCode: bank_code,
        bankName: bank_name,
        bankModifiedDate: time,
      });
      return bank;
    } catch (error) {
      return error.message;
    }
  }

  public async Delete(id: number) {
    try {
      return await this.serviceBank.delete(id);
    } catch (error) {
      return error.message;
    }
  }
}
