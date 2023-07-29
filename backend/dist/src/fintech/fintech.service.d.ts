import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { BusinessEntity } from 'output/entities/BusinessEntity';
import { Fintech } from 'output/entities/Fintech';
import { Repository } from 'typeorm';
export declare class FintechService {
    private serviceFintech;
    private serviceBusinessEntity;
    constructor(serviceFintech: Repository<Fintech>, serviceBusinessEntity: Repository<BusinessEntity>);
    findAll(search: string, options: IPaginationOptions): Promise<Pagination<Fintech>>;
    findOne(id: number): Promise<any>;
    Insert(body: any): Promise<any>;
    Update(id: number, fint_code: string, fint_name: string): Promise<any>;
    Delete(id: number): Promise<any>;
}
