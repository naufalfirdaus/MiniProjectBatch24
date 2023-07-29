import { Bank } from 'output/entities/Bank';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { BusinessEntity } from 'output/entities/BusinessEntity';
export declare class BankService {
    private serviceBank;
    private serviceBusinessEntity;
    constructor(serviceBank: Repository<Bank>, serviceBusinessEntity: Repository<BusinessEntity>);
    findAll(search: string, options: IPaginationOptions): Promise<Pagination<Bank>>;
    findOne(id: number): Promise<any>;
    Insert(body: any): Promise<any>;
    Update(id: number, bank_code: string, bank_name: string): Promise<any>;
    Delete(id: number): Promise<any>;
}
