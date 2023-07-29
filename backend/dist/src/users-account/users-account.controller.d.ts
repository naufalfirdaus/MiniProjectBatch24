import { UsersAccountService } from './users-account.service';
import { UsersDto } from './dto/users.dto';
export declare class UsersAccountController {
    private Services;
    constructor(Services: UsersAccountService);
    getAll(page: number, limit: number): Promise<import("nestjs-typeorm-paginate").Pagination<import("../../output/entities/UsersAccount").UsersAccount, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    getOne(id: number): Promise<any>;
    create(body: UsersDto): Promise<import("../../output/entities/UsersAccount").UsersAccount>;
    edit(accNumber: string, body: any): Promise<any>;
    delete(accNumber: string): Promise<any>;
}
