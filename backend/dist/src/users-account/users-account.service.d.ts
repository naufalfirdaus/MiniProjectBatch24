import { UsersAccount } from 'output/entities/UsersAccount';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
export declare class UsersAccountService {
    private serviceUsersAccount;
    constructor(serviceUsersAccount: Repository<UsersAccount>);
    findAll(options: IPaginationOptions): Promise<Pagination<UsersAccount>>;
    findOne(id: number): Promise<any>;
    Create(body: any): Promise<UsersAccount>;
    Edit(accNumber: string, body: any): Promise<any>;
    Delete(accNumber: string): Promise<any>;
}
