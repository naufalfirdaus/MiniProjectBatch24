import { BankService } from './bank.service';
import { BankDto } from './dto/bank.dto';
export declare class BankController {
    private Services;
    constructor(Services: BankService);
    getAll(page: number, limit: number, search: string): Promise<import("nestjs-typeorm-paginate").Pagination<import("../../output/entities/Bank").Bank, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(id: number): Promise<any>;
    create(body: BankDto): Promise<any>;
    update(id: number, bank_code: string, bank_name: string): Promise<any>;
    delete(id: number): Promise<any>;
}
